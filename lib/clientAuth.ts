// Client-side helpers for admin authentication.
// Stores JWT in sessionStorage and adds Authorization header to admin API calls.

const TOKEN_KEY = 'admin_token';
const FLAG_KEY = 'admin_authenticated';

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(FLAG_KEY, 'true');
}

export function clearAuth(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(FLAG_KEY);
}

// Decode (without verifying) and check expiry.
// Returns true if the token looks valid and is not expired client-side.
// Server still validates signature on every call.
export function isTokenLive(): boolean {
  const token = getToken();
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  try {
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === 'number' && payload.exp > now;
  } catch {
    return false;
  }
}

// Wrapper for fetch that injects Authorization header and handles 401 by clearing auth.
export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    clearAuth();
    // Force re-login by triggering storage event listener in AdminDashboard
    window.dispatchEvent(new Event('admin-auth-expired'));
  }

  return response;
}
