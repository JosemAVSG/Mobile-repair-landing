/**
 * Código de promotor del link (?ref=JANI10). Se guarda en el navegador por 60 días para que el registro lo reciba
 * aunque la persona navegue por la landing antes de pulsar "Empezar prueba gratis". Mismas reglas de forma que el
 * backend y la app (Mobile-repair-front, src/lib/referralIntent.ts): si se cambia una, cambiar las otras.
 */
export const REF_KEY = 'fx-ref';
const TTL_MS = 60 * 24 * 60 * 60 * 1000;
const CODE_PATTERN = /^[A-Z0-9_-]{3,30}$/;

type Store = Pick<Storage, 'getItem' | 'setItem'>;

/** localStorage si existe y responde (modo privado o bloqueado = null: el link sigue funcionando sin guardar). */
function browserStore(): Store | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

/** Normaliza el código; null si no tiene forma de código. */
export function parseRef(value: string | null | undefined): string | null {
  const v = value?.trim().toUpperCase();
  return v && CODE_PATTERN.test(v) ? v : null;
}

/** Guarda el ?ref= de la URL si es válido. Un ?ref= inválido no pisa el guardado. */
export function saveRef(search: string, store: Store | null = browserStore(), now: number = Date.now()): void {
  const code = parseRef(new URLSearchParams(search).get('ref'));
  if (!code || !store) return;
  try {
    store.setItem(REF_KEY, JSON.stringify({ code, at: now }));
  } catch {
    /* sin almacenamiento: vale solo para esta visita */
  }
}

/** Código guardado y vigente, o null. */
export function getRef(store: Store | null = browserStore(), now: number = Date.now()): string | null {
  if (!store) return null;
  try {
    const raw = store.getItem(REF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: unknown; at?: unknown };
    if (typeof parsed.at !== 'number' || now - parsed.at > TTL_MS) return null;
    return typeof parsed.code === 'string' ? parseRef(parsed.code) : null;
  } catch {
    return null;
  }
}

/** Código que debe llevar el registro: el del link actual y, si no hay, el guardado. */
export function currentRef(search: string, store: Store | null = browserStore(), now: number = Date.now()): string | null {
  return parseRef(new URLSearchParams(search).get('ref')) ?? getRef(store, now);
}
