// Cookie-consent store. Holdes i localStorage så valget overlever
// browser-sessioner. Når valget ændres, fyres et CustomEvent så
// tracking-koden (sprint 2) kan reagere uden global state-store.

import { useEffect, useState } from 'react';

export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'pre-cookie-consent';
const EVENT_NAME = 'cookie-consent-changed';

export interface ConsentState {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  timestamp: number;
  version: number;
}

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || typeof parsed !== 'object') return null;
    // Tving gen-samtykke hvis vi har bumpet versionen.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(partial: { statistics: boolean; marketing: boolean }): ConsentState {
  const next: ConsentState = {
    necessary: true,
    statistics: partial.statistics,
    marketing: partial.marketing,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  return next;
}

export function clearConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
}

// Hook der returnerer aktuelt samtykke + en setter, og automatisk
// re-renderer ved samtykke-ændringer (også fra andre komponenter).
export function useConsent() {
  const [consent, setState] = useState<ConsentState | null>(() => getConsent());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState | null>).detail;
      setState(detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return {
    consent,
    isSet: consent !== null,
    statistics: !!consent?.statistics,
    marketing: !!consent?.marketing,
    setConsent,
    clearConsent
  };
}

// Hjælper til at åbne banneren igen fra fx footer-link.
export function openConsentBanner(): void {
  window.dispatchEvent(new CustomEvent('cookie-consent-reopen'));
}
