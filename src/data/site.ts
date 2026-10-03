// Datos centralizados de la landing. Cambia acá nombre, links y contacto.
export const site = {
  name: 'Fixtra',
  brand: 'JG Labs',
  title: 'Fixtra | Software para servicio técnico',
  description:
    'Órdenes, seguimiento por QR, repuestos, técnicos y facturación para talleres de celulares, computadores y consolas.',
  appUrl: 'https://repair.jglabs.tech',
  loginUrl: 'https://repair.jglabs.tech/login',
  contactEmail: 'jmgg.95n@gmail.com',
  // Número en formato internacional sin "+" (ej: 573001234567). Vacío = no se muestra el botón.
  whatsapp: '573114390119',
  ctaLabel: 'Pedir demo',
};

// Estados tal como los nombra la app (StatusBadge.tsx del front)
export const ticketSteps = [
  { label: 'Registrado', tone: 'muted' },
  { label: 'En diagnóstico', tone: 'info' },
  { label: 'En reparación', tone: 'warning' },
  { label: 'Control de calidad', tone: 'info' },
  { label: 'Lista para retiro', tone: 'success' },
] as const;

export const devices = [
  { icon: 'Smartphone', name: 'Celulares', detail: 'iPhone, Samsung, Xiaomi, Motorola' },
  { icon: 'Laptop', name: 'Computadores', detail: 'Portátiles y PC de escritorio' },
  { icon: 'Gamepad2', name: 'Consolas', detail: 'PlayStation, Xbox, Nintendo Switch' },
  { icon: 'Tablet', name: 'Tablets', detail: 'iPad y tablets Android' },
];

export const comparison = [
  {
    situation: 'El cliente pregunta por su equipo',
    before: 'Te llama o te escribe varias veces al día',
    after: 'Escanea el QR del ticket y lo ve por su cuenta',
  },
  {
    situation: 'Encontrar un equipo',
    before: 'Revisar el cuaderno y buscar en los estantes',
    after: 'Buscar por orden, cliente o modelo',
  },
  {
    situation: 'Saber si hay un repuesto',
    before: 'Ir a mirar la caja',
    after: 'Stock al día con alerta de faltantes',
  },
  {
    situation: 'Quién está con qué equipo',
    before: 'Preguntar en el taller',
    after: 'Cada orden tiene su técnico asignado',
  },
  {
    situation: 'Cobrar la reparación',
    before: 'Factura a mano o en otro programa',
    after: 'Factura impresa desde la misma orden',
  },
];

export const features = [
  {
    icon: 'ClipboardList',
    title: 'Órdenes con historial',
    text: 'Cada equipo con su falla, cliente, técnico y una línea de tiempo de todo lo que pasó.',
  },
  {
    icon: 'Package',
    title: 'Repuestos e inventario',
    text: 'Entradas, salidas y stock al día. El sistema te avisa cuando algo se está acabando.',
    tag: 'Stock bajo',
  },
  {
    icon: 'Users',
    title: 'Técnicos y roles',
    text: 'Usuarios de administrador y de técnico, cada uno con lo que necesita ver.',
  },
  {
    icon: 'Receipt',
    title: 'Facturación y pagos',
    text: 'Imprime la factura desde la orden y registra el pago sin planillas aparte.',
  },
  {
    icon: 'ChartLine',
    title: 'Métricas del taller',
    text: 'Equipos activos, entregados e ingresos por período en un solo tablero.',
  },
];

export const steps = [
  { title: 'Recibes el equipo', text: 'Creas la orden con marca, modelo, falla y datos del cliente.' },
  { title: 'Entregas el ticket', text: 'El cliente se lleva su ticket con el código QR.' },
  { title: 'Diagnosticas y reparas', text: 'El técnico actualiza el estado y descuenta los repuestos.' },
  { title: 'Controlas la calidad', text: 'Revisas el equipo antes de avisar que está listo.' },
  { title: 'Facturas y entregas', text: 'Imprimes la factura, registras el pago y cierras la orden.' },
];

export const faqs = [
  {
    q: '¿Necesito instalar algo?',
    a: 'No. Funciona desde el navegador en computador, tablet o celular.',
  },
  {
    q: '¿Sirve para computadores y consolas, o solo para celulares?',
    a: 'Sirve para cualquier equipo. Registras la marca y el modelo de lo que llegue al mostrador.',
  },
  {
    q: '¿Mis clientes necesitan crear una cuenta?',
    a: 'No. Escanean el QR del ticket y ven el estado de su equipo en una página pública.',
  },
  {
    q: '¿Puedo tener varios técnicos?',
    a: 'Sí. Cada técnico tiene su propio usuario y puedes asignarle órdenes.',
  },
  {
    q: '¿Puedo usar la marca de mi taller?',
    a: 'Sí. Desde la configuración subes tu logo y eliges el color de tu taller.',
  },
];
