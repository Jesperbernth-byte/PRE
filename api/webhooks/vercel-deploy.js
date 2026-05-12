// Webhook receiver for Vercel deployment events.
//
// Setup (one-time, in Vercel dashboard):
//   1. Project → Settings → Webhooks → Create Webhook
//   2. URL: https://prentreprenoer.dk/api/webhooks/vercel-deploy
//   3. Events: deployment.created, deployment.succeeded, deployment.ready,
//      deployment.error, deployment.canceled
//   4. Copy the generated Signing Secret into Vercel env var VERCEL_WEBHOOK_SECRET
//
// Without VERCEL_WEBHOOK_SECRET the endpoint refuses all calls (no auth bypass).

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Vercel's body parser drops the raw bytes we need for signature verification.
export const config = {
  api: { bodyParser: false }
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader) return false;
  const expected = crypto
    .createHmac('sha1', secret)
    .update(rawBody)
    .digest('hex');
  const provided = Buffer.from(signatureHeader);
  const computed = Buffer.from(expected);
  if (provided.length !== computed.length) return false;
  return crypto.timingSafeEqual(provided, computed);
}

// Vercel sends event types like "deployment.succeeded" plus a
// payload.deployment with state/url/meta. We normalise to:
//   { state: 'READY' | 'BUILDING' | 'ERROR' | 'CANCELED' | 'QUEUED', ... }
function normaliseEvent(event) {
  const type = event?.type || '';
  const deployment = event?.payload?.deployment || {};
  const project = event?.payload?.project || {};

  let state = (deployment.state || deployment.readyState || '').toUpperCase();
  if (!state) {
    if (type.endsWith('.succeeded') || type.endsWith('.ready')) state = 'READY';
    else if (type.endsWith('.error')) state = 'ERROR';
    else if (type.endsWith('.canceled')) state = 'CANCELED';
    else if (type.endsWith('.created')) state = 'BUILDING';
  }

  return {
    event_type: type,
    state,
    deployment_id: deployment.id || null,
    deployment_url: deployment.url ? `https://${deployment.url}` : null,
    commit_sha: deployment.meta?.githubCommitSha || deployment.meta?.gitCommitSha || null,
    branch: deployment.meta?.githubCommitRef || deployment.meta?.gitCommitRef || null,
    target: deployment.target || null,
    project_name: project.name || deployment.name || null
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const secret = process.env.VERCEL_WEBHOOK_SECRET;
  if (!secret) {
    console.error('VERCEL_WEBHOOK_SECRET not set — refusing webhook');
    return res.status(500).json({ success: false, message: 'Webhook secret not configured' });
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (err) {
    console.error('Failed to read webhook body:', err);
    return res.status(400).json({ success: false, message: 'Bad request' });
  }

  const signature = req.headers['x-vercel-signature'];
  if (!verifySignature(rawBody, signature, secret)) {
    console.warn('Invalid Vercel webhook signature');
    return res.status(401).json({ success: false, message: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf-8'));
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid JSON' });
  }

  const normalised = normaliseEvent(event);

  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error } = await supabase.from('vercel_deploy_events').insert([{
    ...normalised,
    raw_payload: event
  }]);

  if (error) {
    console.error('Failed to insert deploy event:', error);
    // Don't 500 — Vercel will retry on failure and we don't want infinite retries
    // if the table is missing. Log and accept.
  }

  return res.status(200).json({ success: true });
}
