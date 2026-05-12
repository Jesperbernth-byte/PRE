import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../lib/serverAuth.js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  const { commitSha } = req.query;
  if (!commitSha || typeof commitSha !== 'string') {
    return res.status(400).json({ success: false, message: 'commitSha er påkrævet' });
  }

  const shaPrefix = commitSha.substring(0, 7);

  const { data, error } = await supabase
    .from('vercel_deploy_events')
    .select('event_type, state, deployment_url, target, received_at')
    .or(`commit_sha.eq.${commitSha},commit_sha.ilike.${shaPrefix}%`)
    .eq('target', 'production')
    .order('received_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('deploy-status query error:', error);
    return res.status(500).json({ success: false, message: 'Kunne ikke hente deploy-status', error: error.message });
  }

  const event = data && data[0];
  if (!event) {
    return res.status(200).json({
      success: true,
      status: 'pending',
      message: 'Venter på Vercel build-status…'
    });
  }

  return res.status(200).json({
    success: true,
    status: event.state || event.event_type,
    deploymentUrl: event.deployment_url,
    target: event.target,
    receivedAt: event.received_at
  });
}
