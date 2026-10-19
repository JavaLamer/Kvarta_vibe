import { UtmParams } from '../types';

const STORAGE_KEY = 'kvarta_utm_tracking_data';

export function getOrCaptureUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      landing_page: '/',
      referrer: null,
    };
  }

  // 1. Check existing saved tracking data from this session
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // ignore storage access errors in private modes
  }

  // 2. Parse current URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const data: UtmParams = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }

  return data;
}
