// src/lib/urlState.ts
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { base } from '$app/paths';

interface AppState {
  key: string;
  keyEncoding: 'utf8' | 'hex' | 'base64';
  message: string;
  messageEncoding: 'utf8' | 'hex' | 'base64';
  outputFormat: 'hex' | 'base64';
}

const DEFAULT_STATE: AppState = {
  key: '',
  keyEncoding: 'utf8',
  message: '',
  messageEncoding: 'utf8',
  outputFormat: 'hex'
};

export function saveStateToUrl(state: AppState) {
  if (!browser) return;

  const compressed = btoa(
    JSON.stringify({
      k: state.key,
      ke: state.keyEncoding,
      m: state.message,
      me: state.messageEncoding,
      o: state.outputFormat
    })
  );

  const newUrl = `${window.location.pathname}${base}#${compressed}`;
  window.history.replaceState({}, '', newUrl);
}

export function loadStateFromUrl(): Partial<AppState> {
  if (!browser || !window.location.hash) return DEFAULT_STATE;

  try {
    const hash = window.location.hash.slice(1);
    const decoded = JSON.parse(atob(hash));

    return {
      key: decoded.k ?? '',
      keyEncoding: ['utf8', 'hex', 'base64'].includes(decoded.ke) ? decoded.ke : 'utf8',
      message: decoded.m ?? '',
      messageEncoding: ['utf8', 'hex', 'base64'].includes(decoded.me) ? decoded.me : 'utf8',
      outputFormat: ['hex', 'base64'].includes(decoded.o) ? decoded.o : 'hex'
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function clearUrlHash() {
  if (browser) {
    window.history.replaceState({}, '', window.location.pathname + base);
  }
}