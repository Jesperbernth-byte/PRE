// Consent-gated tracking: GA4 + Meta Pixel.
// Scripts loades først efter brugeren har givet samtykke til den
// pågældende kategori. Statistik → GA4. Marketing → Meta Pixel.
//
// IDs sættes via env vars i Vercel:
//   VITE_GA_MEASUREMENT_ID (fx G-XXXXXXXXXX)
//   VITE_FB_PIXEL_ID       (talstreng)
//
// Hvis en ID mangler, springes den loader over uden fejl — så sitet
// kører fint indtil Jacob har konti klar.

import { getConsent } from './consent';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any;
    _fbq?: any;
  }
}

const GA_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID as string | undefined;
const FB_PIXEL_ID = (import.meta as any).env?.VITE_FB_PIXEL_ID as string | undefined;

let ga4Loaded = false;
let pixelLoaded = false;

function injectScript(src: string, id: string): void {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGA4(): void {
  if (ga4Loaded || !GA_ID) return;
  ga4Loaded = true;

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, 'ga4-loader');

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: true,
    anonymize_ip: true
  });
}

function loadPixel(): void {
  if (pixelLoaded || !FB_PIXEL_ID) return;
  pixelLoaded = true;

  // Standard Meta Pixel base code, oversat til ren funktion.
  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.id = 'fb-pixel-loader';
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
}

// Anvendes ved app-mount og hver gang samtykke ændres.
export function initTracking(): void {
  const consent = getConsent();
  if (consent?.statistics) loadGA4();
  if (consent?.marketing) loadPixel();
}

// Konverteringshjælpere — sikre at kalde også uden samtykke (no-op da).
export function trackFormSubmit(meta: { source: 'form' | 'chat' }): void {
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: meta.source,
      value: 1
    });
  }
  if (window.fbq) {
    window.fbq('track', 'Lead', { method: meta.source });
  }
}

export function trackPhoneClick(label?: string): void {
  if (window.gtag) {
    window.gtag('event', 'phone_click', { label: label || 'phone' });
  }
  if (window.fbq) {
    window.fbq('track', 'Contact');
  }
}

export function trackFBFeedView(): void {
  if (window.gtag) {
    window.gtag('event', 'facebook_feed_view');
  }
}

export function isGA4Ready(): boolean {
  return !!GA_ID && ga4Loaded;
}

export function isPixelReady(): boolean {
  return !!FB_PIXEL_ID && pixelLoaded;
}
