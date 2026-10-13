/**
 * Moneda y país "de cortesía" para mostrar precios: se deducen de la zona horaria del navegador. No usa IP
 * ni servicios externos, y es solo INFORMATIVO: la moneda real de cobro la fija el país que la persona elige
 * al registrarse en la app (Colombia = COP con tarjeta; el resto = USD con USDT).
 *
 * Nota: la app (Mobile-repair-front, src/utils/paises.ts) tiene la misma tabla para preseleccionar el país
 * del registro. Si se cambia una, cambiar la otra.
 */
export type Currency = 'cop' | 'usd';

export const CURRENCY_KEY = 'fx-currency';

const TZ_EXACT: Record<string, string> = {
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'America/Caracas': 'VE',
  'America/Santiago': 'CL',
  'America/Punta_Arenas': 'CL',
  'America/Guayaquil': 'EC',
  'America/La_Paz': 'BO',
  'America/Asuncion': 'PY',
  'America/Montevideo': 'UY',
  'America/Panama': 'PA',
  'America/Costa_Rica': 'CR',
  'America/Guatemala': 'GT',
  'America/Tegucigalpa': 'HN',
  'America/El_Salvador': 'SV',
  'America/Managua': 'NI',
  'America/Santo_Domingo': 'DO',
  'America/Mexico_City': 'MX',
  'America/Monterrey': 'MX',
  'America/Merida': 'MX',
  'America/Cancun': 'MX',
  'America/Tijuana': 'MX',
  'America/Chihuahua': 'MX',
  'America/Hermosillo': 'MX',
  'America/Mazatlan': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Ciudad_Juarez': 'MX',
  'America/Matamoros': 'MX',
  'America/Ojinaga': 'MX',
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',
};

/** Prefijos de zona que corresponden a un solo país. */
const TZ_PREFIX: [string, string][] = [
  ['America/Argentina/', 'AR'],
  ['America/Buenos_Aires', 'AR'],
  ['America/Sao_Paulo', 'BR'],
  ['America/Bahia', 'BR'],
  ['America/Fortaleza', 'BR'],
  ['America/Recife', 'BR'],
  ['America/Belem', 'BR'],
  ['America/Manaus', 'BR'],
  ['America/Cuiaba', 'BR'],
  ['America/Campo_Grande', 'BR'],
  ['America/Maceio', 'BR'],
  ['America/Araguaina', 'BR'],
  ['America/Porto_Velho', 'BR'],
  ['America/Rio_Branco', 'BR'],
  ['America/Boa_Vista', 'BR'],
  ['America/Noronha', 'BR'],
  ['America/Santarem', 'BR'],
  ['America/Eirunepe', 'BR'],
  ['America/New_York', 'US'],
  ['America/Chicago', 'US'],
  ['America/Denver', 'US'],
  ['America/Los_Angeles', 'US'],
  ['America/Phoenix', 'US'],
  ['America/Anchorage', 'US'],
  ['America/Detroit', 'US'],
  ['America/Indiana/', 'US'],
  ['America/Kentucky/', 'US'],
  ['America/Boise', 'US'],
  ['Pacific/Honolulu', 'US'],
];

/** Zonas genéricas (dispositivos sin zona configurada): no dicen nada del país, se tratan como "no se sabe". */
const AMBIGUOUS_TZ = new Set(['UTC', 'Etc/UTC', 'Etc/GMT', 'GMT', 'Etc/Unknown']);

/** País (ISO alfa-2) que corresponde a la zona horaria, o null si no se puede saber. */
export function guessCountry(tz: string | null | undefined): string | null {
  if (!tz) return null;
  if (TZ_EXACT[tz]) return TZ_EXACT[tz];
  const hit = TZ_PREFIX.find(([prefix]) => tz.startsWith(prefix));
  return hit ? hit[1] : null;
}

/**
 * Moneda por defecto: pesos si la zona horaria es de Colombia o no se puede saber (el público principal);
 * dólares si es de cualquier otra zona conocida. Una elección guardada por la persona manda siempre.
 */
export function detectCurrency(tz: string | null | undefined, saved?: string | null): Currency {
  if (saved === 'cop' || saved === 'usd') return saved;
  if (!tz || AMBIGUOUS_TZ.has(tz)) return 'cop';
  return tz === 'America/Bogota' ? 'cop' : 'usd';
}

/**
 * Enlace de registro con el plan y, si se conocen, el país (pista: el registro lo deja preseleccionado) y el código
 * del promotor que recomendó la app (el registro lo precarga y lo envía al backend).
 */
export function signupHref(base: string, planId: string, country: string | null, ref: string | null = null): string {
  const url = new URL(base);
  url.searchParams.set('plan', planId);
  if (country) url.searchParams.set('pais', country);
  if (ref) url.searchParams.set('ref', ref);
  return url.toString();
}
