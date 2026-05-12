// Simpel rate-limit baseret på Supabase. Logger hver request pr. IP
// og tjekker om der er for mange inden for et given vindue.
//
// Bruges af /api/submit-lead.js til at forhindre formular-spam.

import { createClient } from '@supabase/supabase-js';

let cachedClient = null;
function getClient() {
  if (cachedClient) return cachedClient;
  cachedClient = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  return cachedClient;
}

export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    return String(xff).split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';
}

/**
 * Tjek om IP'en allerede har lavet for mange requests, og log denne
 * request ind for fremtidige tjek.
 *
 * Returnerer { allowed: boolean, count: number, retryAfterSeconds?: number }
 *
 * Hvis Supabase fejler, fail-open så vi ikke blokerer legit brugere.
 */
export async function checkAndLogIp({ ip, endpoint, windowSeconds = 3600, maxRequests = 5 }) {
  if (!ip || ip === 'unknown') {
    return { allowed: true, count: 0 };
  }

  const supabase = getClient();
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();

  try {
    const { count, error } = await supabase
      .from('submit_rate_log')
      .select('id', { count: 'exact', head: true })
      .eq('ip', ip)
      .eq('endpoint', endpoint)
      .gte('created_at', since);

    if (error) {
      console.warn('rate-limit count error (fail-open):', error.message);
      return { allowed: true, count: 0 };
    }

    if ((count || 0) >= maxRequests) {
      return {
        allowed: false,
        count: count || 0,
        retryAfterSeconds: windowSeconds
      };
    }

    // Log this request (best-effort)
    await supabase.from('submit_rate_log').insert([{ ip, endpoint }]).catch(() => {});

    return { allowed: true, count: (count || 0) + 1 };
  } catch (err) {
    console.warn('rate-limit fail-open:', err.message);
    return { allowed: true, count: 0 };
  }
}
