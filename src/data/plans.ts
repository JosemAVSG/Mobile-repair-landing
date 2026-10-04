import { plans as fallbackPlans } from './site';

export interface Plan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: readonly string[];
  highlighted: boolean;
}

interface ApiPlan {
  plan: string;
  nombre: string;
  descripcion?: string | null;
  precioCop: number;
  features: string[];
  destacado: boolean;
}

// URL del backend. En el deploy se define PUBLIC_API_URL; si no, se usa la del API publicado.
const API_URL = import.meta.env.PUBLIC_API_URL ?? 'https://reparaciones-api.onrender.com';

/**
 * Planes y precios desde GET /api/billing/planes (fuente única, compartida con la app).
 * Se resuelve al compilar la landing; si el API no responde, se usan los valores de site.ts.
 */
export async function getPlans(): Promise<readonly Plan[]> {
  try {
    const res = await fetch(`${API_URL}/api/billing/planes`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const list: ApiPlan[] = body?.data ?? body;
    if (!Array.isArray(list) || list.length === 0) throw new Error('catálogo vacío');
    return list.map((p) => ({
      id: p.plan.toLowerCase(),
      name: p.nombre,
      price: p.precioCop,
      tagline: p.descripcion ?? '',
      features: p.features,
      highlighted: p.destacado,
    }));
  } catch (e) {
    console.warn(`[plans] usando precios de respaldo: ${(e as Error).message}`);
    return fallbackPlans;
  }
}
