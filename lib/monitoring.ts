/**
 * Error Monitoring & Alerting System
 *
 * Catches all JavaScript errors and unhandled promise rejections,
 * logs them to Supabase, and sends email alerts for critical issues.
 */

interface ErrorLog {
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  url: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

interface HealthCheckResult {
  name: string;
  healthy: boolean;
  error?: string;
}

/**
 * Logs error to Supabase database
 */
export async function logError(error: ErrorLog): Promise<void> {
  try {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('Supabase not configured - error not logged:', error);
      return;
    }

    // Log to Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/error_logs`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        error_type: error.errorType,
        error_message: error.errorMessage,
        stack_trace: error.stackTrace,
        url: error.url,
        user_agent: navigator.userAgent,
        severity: error.severity
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to log error: ${response.statusText}`);
    }

    // Send email alert if critical
    if (error.severity === 'critical') {
      await sendAlertEmail({
        subject: '🚨 CRITICAL: PRE Website Error',
        message: `
⚠️ KRITISK FEJL PÅ PR ENTREPRENØR WEBSITE

Fejl Type: ${error.errorType}
Besked: ${error.errorMessage}
URL: ${error.url}
Tidspunkt: ${new Date().toLocaleString('da-DK')}
Browser: ${navigator.userAgent}

Stack Trace:
${error.stackTrace || 'N/A'}

--
Dette er en automatisk besked fra PRE monitoring systemet.
Log ind på Supabase for at se alle detaljer.
        `
      });
    }
  } catch (e) {
    // Last resort: console log
    console.error('Failed to log error to monitoring system:', e);
    console.error('Original error:', error);
  }
}

/**
 * Sends email alert via Resend API
 */
async function sendAlertEmail(params: { subject: string; message: string }): Promise<void> {
  try {
    const RESEND_KEY = import.meta.env.RESEND_API_KEY;
    const ALERT_EMAIL = import.meta.env.VITE_ALERT_EMAIL || 'jesperbernth@gmail.com';

    if (!RESEND_KEY) {
      console.error('Resend not configured - email not sent');
      return;
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'PRE Monitoring <noreply@resend.dev>',
        to: ALERT_EMAIL,
        subject: params.subject,
        text: params.message
      })
    });
  } catch (e) {
    console.error('Failed to send alert email:', e);
  }
}

/**
 * Initialize global error monitoring
 * Call this once at app startup
 */
export function initErrorMonitoring(): void {
  // Catch JavaScript errors
  window.addEventListener('error', (event) => {
    logError({
      errorType: 'JavaScript Error',
      errorMessage: event.message,
      stackTrace: event.error?.stack,
      url: window.location.href,
      severity: 'error'
    });
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError({
      errorType: 'Unhandled Promise Rejection',
      errorMessage: event.reason?.message || String(event.reason),
      stackTrace: event.reason?.stack,
      url: window.location.href,
      severity: 'error'
    });
  });

  console.log('✅ Error monitoring initialized');
}

/**
 * Check health of a specific feature
 * Returns true if healthy, false if not
 */
export async function checkFeatureHealth(
  featureName: string,
  healthCheck: () => Promise<boolean>
): Promise<boolean> {
  try {
    // Timeout after 5 seconds
    const isHealthy = await Promise.race([
      healthCheck(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Health check timeout')), 5000)
      )
    ]);

    if (!isHealthy) {
      await logError({
        errorType: 'Feature Health Check Failed',
        errorMessage: `${featureName} health check returned false`,
        url: window.location.href,
        severity: 'critical'
      });
    }

    return isHealthy;
  } catch (error) {
    await logError({
      errorType: 'Feature Health Check Error',
      errorMessage: `${featureName} threw error: ${error}`,
      stackTrace: error instanceof Error ? error.stack : undefined,
      url: window.location.href,
      severity: 'critical'
    });
    return false;
  }
}

/**
 * Run all critical health checks
 * Should be called periodically (e.g., every hour)
 */
export async function runAllHealthChecks(): Promise<HealthCheckResult[]> {
  const checks: Array<{ name: string; check: () => Promise<boolean> }> = [
    {
      name: 'AI Chatbot',
      check: async () => {
        // Test if Gemini API key is configured
        return !!import.meta.env.VITE_GEMINI_API_KEY;
      }
    },
    {
      name: 'Database Connection',
      check: async () => {
        // Test Supabase connection
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        if (!url || !key) return false;

        try {
          const response = await fetch(`${url}/rest/v1/`, {
            headers: { 'apikey': key }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Email Service',
      check: async () => {
        // Test if Resend is configured
        return !!import.meta.env.RESEND_API_KEY;
      }
    }
  ];

  const results: HealthCheckResult[] = [];

  for (const { name, check } of checks) {
    try {
      const healthy = await checkFeatureHealth(name, check);
      results.push({ name, healthy });
    } catch (error) {
      results.push({
        name,
        healthy: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  return results;
}

/**
 * Start periodic health checks (every hour)
 */
export function startPeriodicHealthChecks(): void {
  // Run immediately
  runAllHealthChecks().then(results => {
    console.log('Initial health check:', results);
  });

  // Run every hour
  setInterval(() => {
    runAllHealthChecks().then(results => {
      const failed = results.filter(r => !r.healthy);
      if (failed.length > 0) {
        console.error('Health checks failed:', failed);
      }
    });
  }, 60 * 60 * 1000); // 1 hour
}
