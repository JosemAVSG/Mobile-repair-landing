// Reglas del programa de promotores. Un solo lugar para ajustar porcentajes, niveles y textos.
// Mientras el programa esté en piloto cerrado, la página /promotores no se enlaza ni se indexa.

export interface Tier {
  /** Talleres activos referidos desde los que aplica el nivel. */
  min: number;
  /** Último número del nivel; sin valor = sin tope. */
  max?: number;
  /** Porcentaje sobre lo que el taller efectivamente pagó. */
  rate: number;
}

export const tiers: readonly Tier[] = [
  { min: 1, max: 9, rate: 20 },
  { min: 10, max: 24, rate: 25 },
  { min: 25, rate: 30 },
];

export const tierLabel = (t: Tier): string => (t.max ? `${t.min} a ${t.max}` : `${t.min} o más`);

export const affiliateSteps = [
  { title: 'Recibes tu código', text: 'Te damos un código y un link personal para compartir con dueños de talleres.' },
  { title: 'El taller se registra', text: 'Entra con tu link o usa tu código al crear su cuenta y empieza la prueba gratis.' },
  { title: 'El taller paga su plan', text: 'Cuando termina la prueba y hace su primer pago, empieza tu comisión.' },
  { title: 'Cobras cada mes', text: 'Mientras el taller siga pagando, recibes tu porcentaje en cada pago mensual.' },
];

export const affiliateRules = [
  'La comisión se calcula sobre lo que el taller efectivamente pagó, después de descuentos.',
  'La prueba gratis no genera comisión: cuenta desde el primer pago real.',
  'El nivel se define con los talleres activos y al día en el corte mensual, y aplica a toda la comisión del mes.',
  'Si un pago se reembolsa o se revierte, esa comisión se anula.',
  'Cada pago se aprueba tras un periodo de espera corto, para cubrir reembolsos y contracargos.',
  'Pagamos una vez al mes, en pesos o en USDT, con un mínimo acumulado para retirar.',
];

export const affiliateFaqs = [
  {
    q: '¿Cuánto tiempo cobro por cada taller?',
    a: 'Mientras el taller siga suscrito y pagando. Si cancela, esa comisión termina.',
  },
  {
    q: '¿Qué pasa si el taller no paga después de la prueba?',
    a: 'No hay comisión por ese taller: solo se paga sobre pagos reales.',
  },
  {
    q: '¿Cómo y cuándo me pagan?',
    a: 'Una vez al mes. En Colombia en pesos y fuera de Colombia en USDT. Se define un mínimo acumulado para retirar.',
  },
  {
    q: '¿Soy socio de Fixtra?',
    a: 'No. Eres un aliado comercial que gana una comisión por referidos, sin relación laboral ni societaria.',
  },
];
