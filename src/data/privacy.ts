// Contenido del Aviso de Privacidad de Fixtra.
//
// NOTA PARA REVISIÓN LEGAL (no se renderiza):
// - Verificar los plazos de conservación de logs de seguridad y 2FA contra la
//   configuración real del backend.
// - Verificar que los contratos con los encargados/sub-encargados (Render, Vercel,
//   Cloudflare, Cloudinary, Resend, Wompi) incluyan cláusulas de protección de
//   datos y de transferencia internacional (Ley 1581 Art. 3 / Decreto 1377 de 2013).
// - La fila "Comprobante de pago" entra en vigor cuando se publique la función de
//   subida de comprobantes. Si se publica el aviso antes, eliminar esa fila.
// - Confirmar con asesoría jurídica si JG Labs actúa como responsable conjunto o
//   como encargado puro respecto de los datos de los talleres.

export type PrivacyBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'note'; text: string };

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export const privacyMeta = {
  responsable: 'JG Labs',
  producto: 'Fixtra',
  fecha: '21 de octubre de 2026',
  email: 'jmgg.95n@gmail.com',
};

/** Roles que JG Labs actúa respecto de cada tipo de dato. */
export const privacyRoles = [
  {
    rol: 'Responsable',
    de: 'Los datos de los talleres y de los usuarios que los usan (administradores y técnicos).',
    descripcion:
      'JG Labs decide qué datos pide, para qué los usa y cuánto tiempo los conserva, porque es quien opera la plataforma y factura la suscripción.',
  },
  {
    rol: 'Encargado',
    de: 'Los datos que cada taller registra de sus propios clientes.',
    descripcion:
      'El taller decide para qué usa esos datos y con qué fin. JG Labs los almacena y los procesa por cuenta del taller, sin usarlos para finalidades propias.',
  },
];

export const privacySections: PrivacySection[] = [
  {
    id: 'responsable',
    title: 'Quién es el responsable del tratamiento',
    blocks: [
      {
        kind: 'p',
        text: 'JG Labs opera Fixtra, el sistema de gestión para talleres de reparación de celulares, computadores y consolas. Este aviso explica qué datos tratamos, con qué propósito, con quién los compartimos y cómo puedes ejercer tus derechos.',
      },
      {
        kind: 'p',
        text: 'Lo primero que hay que entender es que en Fixtra hay dos partes y dos roles distintos, y el aviso debe leerlos con claridad:',
      },
      { kind: 'ul', items: [
        'El taller es el responsable del tratamiento de los datos de sus clientes: decide para qué los usa, cómo los comunica y cuánto tiempo los conserva.',
        'JG Labs es el encargado: presta la plataforma, guarda esa información en sus servidores y la procesa por cuenta del taller, sin usarla para finalidades propias.',
      ] },
      {
        kind: 'p',
        text: 'Cuando un taller crea una orden con el nombre y el teléfono de su cliente, ese cliente es titular de esos datos y el taller es su responsable. JG Labs interviene como encargado. Cuando un usuario del taller se registra en Fixtra, ese usuario es titular de sus datos y JG Labs es el responsable.',
      },
      {
        kind: 'note',
        text: 'Para cualquier consulta sobre este aviso o sobre tus datos, escríbenos a jmgg.95n@gmail.com.',
      },
    ],
  },
  {
    id: 'datos-jg-labs',
    title: 'Datos que JG Labs trata como responsable',
    blocks: [
      {
        kind: 'p',
        text: 'Estos datos son de los talleres que usan Fixtra y de las personas que los usan:',
      },
      {
        kind: 'table',
        head: ['Dato', 'Para qué lo usamos', 'Cuánto tiempo lo conservamos'],
        rows: [
          [
            'Nombre, correo y teléfono de los usuarios del taller; rol (administrador o técnico) y credenciales de acceso',
            'Crear y administrar la cuenta, autenticar el ingreso y prestar soporte',
            'Mientras la cuenta esté activa y por los plazos legales y tributarios aplicables',
          ],
          [
            'Datos de la suscripción y de los pagos de la plataforma (plan, estado, comprobantes, historial)',
            'Facturar, gestionar el cobro, atender solicitudes y prevenir fraude',
            '5 años, por el plazo de conservación de los soportes contables y tributarios',
          ],
          [
            'Registros de acceso y de seguridad (intentos de ingreso, verificación en dos pasos, recuperación de contraseña)',
            'Proteger la cuenta y detectar accesos no autorizados',
            'Mientras la cuenta esté activa y hasta 6 meses después de su cierre',
          ],
          [
            'Configuración del taller: nombre, logo, color, métodos de cobro y datos bancarios para recibir pagos',
            'Personalizar la orden, generar los comprobantes y mostrar los métodos de pago al cliente',
            'Mientras la cuenta esté activa y por los plazos legales y tributarios aplicables',
          ],
          [
            'Inventario de productos, repuestos, precios y proveedores',
            'Administrar el stock del taller y calcular presupuestos',
            'Mientras la cuenta esté activa y por los plazos legales y tributarios aplicables',
          ],
          [
            'Datos del programa de promotores: nombre, teléfono, código de referido y comisiones',
            'Gestionar el programa y pagar las comisiones',
            'Mientras el vínculo esté activo y por 5 años más, como soporte contable',
          ],
          [
            'Solicitudes de soporte y comunicaciones con el equipo de Fixtra',
            'Atender consultas, resolver incidencias y mejorar el producto',
            '2 años desde la última comunicación',
          ],
        ],
      },
    ],
  },
  {
    id: 'datos-taller',
    title: 'Datos que el taller trata como responsable y JG Labs como encargado',
    blocks: [
      {
        kind: 'p',
        text: 'Estos datos los registra el taller sobre sus clientes. El taller decide sobre ellos; JG Labs solo los procesa por cuenta del taller, siguiendo las instrucciones y las políticas que el taller define.',
      },
      {
        kind: 'table',
        head: ['Dato', 'Para qué lo usa el taller', 'Cuánto tiempo lo conserva'],
        rows: [
          [
            'Nombre, teléfono y correo del cliente de la orden',
            'Identificar al cliente, contactarlo sobre su equipo y entregarlo al final de la reparación',
            'Hasta el cierre de la orden y por el plazo de conservación contable del taller (máximo 5 años)',
          ],
          [
            'Datos del equipo: marca, modelo, tipo, número de serie, IMEI, capacidad, tipo de gas y voltaje',
            'Diagnosticar, reparar y dar garantía del equipo',
            'Igual que el de la orden',
          ],
          [
            'Falla reportada, observaciones, historial de estados, presupuesto y su aprobación',
            'Prestar el servicio, dejar constancia de lo acordado y atender garantías',
            'Igual que el de la orden',
          ],
          [
            'Fotos de la reparación (antes, durante y después)',
            'Documentar el proceso, respaldar el diagnóstico y atender garantías',
            'Igual que el de la orden',
          ],
          [
            'Datos del pago: anticipo, saldo, método de cobro, referencia y, si el cliente lo adjunta, el comprobante de pago',
            'Cobrar, conciliar los pagos y soportar la operación contable',
            'Los datos del pago, 5 años como soporte contable. La imagen del comprobante, 90 días desde la resolución del pago (aprobado o rechazado); si el pago queda pendiente de revisión, 15 días',
          ],
        ],
      },
      {
        kind: 'note',
        text: 'El plazo de conservación de la orden se explica aquí con el criterio general del Estatuto Tributario. Cada taller puede definir plazos propios dentro de ese marco, y esos son los que rigen para sus datos.',
      },
    ],
  },
  {
    id: 'finalidades',
    title: 'Finalidades y bases legales',
    blocks: [
      {
        kind: 'p',
        text: 'Tratamos los datos únicamente para las finalidades descritas en este aviso. No los vendemos, no los alquilamos y no los usamos para publicidad de terceros.',
      },
      {
        kind: 'ul',
        items: [
          'Finalidad contractual: para gestionar tu cuenta, tus órdenes, tus cobros y tu suscripción. Es el fundamento para tratar la mayoría de los datos de la operación.',
          'Obligación legal: para conservar los soportes contables y tributarios, y atender requerimientos de autoridades competentes.',
          'Consentimiento: para tratar datos sensibles —como los datos financieros de tus clientes— cuando la ley lo exige de forma expresa y por escrito, y para cualquier comunicación comercial.',
          'Interés legítimo: para prevenir fraude, asegurar la disponibilidad del servicio y mejorar el producto, siempre que tus derechos no prevalalezcan.',
        ],
      },
      {
        kind: 'p',
        text: 'Los datos financieros de tus clientes —el comprobante de pago que puede adjuntar, sus movimientos y su saldo— se consideran datos sensibles bajo la Ley 1581 de 2012. Por eso solo se registran con la autorización expresa del titular, que puedes solicitar en cualquier momento y que puedes retirar cuando quieras.',
      },
    ],
  },
  {
    id: 'encargados',
    title: 'Con quién compartimos la información',
    blocks: [
      {
        kind: 'p',
        text: 'Solo compartimos datos con los proveedores que hacen posible que Fixtra funcione. Cada uno recibe solo lo que necesita y actúa por cuenta de JG Labs o del taller:',
      },
      {
        kind: 'table',
        head: ['Proveedor', 'Qué hace con los datos'],
        rows: [
          ['Render', 'Aloja la API de Fixtra: es donde se procesan las órdenes, las cuentas y los pagos.'],
          ['Vercel', 'Aloja la aplicación web desde la que se usa Fixtra.'],
          ['Cloudflare R2', 'Guarda los archivos subidos: fotos de la reparación, esquemasáticos y comprobantes de pago.'],
          ['Cloudinary', 'Guarda y sirve las imágenes de la reparación.'],
          ['Resend', 'Envía los correos transaccionales de la plataforma (recuperación de contraseña, avisos de orden, notificaciones).'],
          ['Wompi', 'Procesa los pagos con tarjeta. Los datos de la tarjeta se tokenizan en tu navegador y Fixtra nunca almacena el número completo de la tarjeta.'],
        ],
      },
      {
        kind: 'p',
        text: 'Los proveedores de infraestructura, almacenamiento de archivos y correo electrónico están ubicados en Estados Unidos, por lo que la atención de tus solicitudes implica una transferencia internacional de datos. Esas transferencias están cubiertas por los acuerdos de encargo celebrados con cada proveedor, que incluyen las garantías exigidas por la Ley 1581 de 2012 y su Decreto reglamentario.',
      },
    ],
  },
  {
    id: 'derechos',
    title: 'Tus derechos',
    blocks: [
      {
        kind: 'p',
        text: 'La Ley 1581 de 2012 te reconoce, frente a quien trate tus datos, los siguientes derechos:',
      },
      {
        kind: 'ul',
        items: [
          'Conocer qué datos tuyos tenemos y para qué los usamos.',
          'Actualizarlos cuando estén incompletos o desactualizados.',
          'Rectificarlos cuando sean inexactos.',
          'Solicitar su supresión (cancelación) cuando consideres que no son necesarios.',
          'Obtener una copia portable de tus datos.',
          'No ser objeto de decisiones que se adopten únicamente de forma automatizada.',
          'Revocar el consentimiento que hayas dado, en cualquier momento y sin costo.',
        ],
      },
      {
        kind: 'p',
        text: 'Para ejercerlos, escríbenos a jmgg.95n@gmail.com o comunícate con el taller que registró tus datos. Responderemos dentro de los plazos previstos por la ley. Si no obtienes respuesta o si no quedas conforme, puedes presentar una queja o reclamación ante la Superintendencia de Industria y Comercio, autoridad de protección de datos personales en Colombia.',
      },
      {
        kind: 'p',
        text: 'El enlace de seguimiento por código QR que recibe el cliente muestra datos de su orden (estado, equipo y nombre). Ese enlace es personal: el cliente no debe compartirlo con terceros.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies y almacenamiento local',
    blocks: [
      {
        kind: 'ul',
        items: [
          'Usamos almacenamiento local del navegador (localStorage) para mantener tu sesión iniciada, recordar tus preferencias de tema y color, y recordar que ya cerraste el aviso de notificaciones push. La clave de referido se guarda solo en tu navegador y no se envía a nuestros servidores.',
          'No usamos cookies de seguimiento, de publicidad ni de analítica. No hay herramientas de medición de audiencia de terceros ni píxeles de redes sociales.',
        ],
      },
    ],
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    blocks: [
      {
        kind: 'ul',
        items: [
          'La conexión entre tu navegador y nuestros servidores está cifrada con TLS.',
          'Cada taller solo puede ver los datos de su propio taller: el aislamiento entre talleres se aplica en el servidor, no en la interfaz.',
          'Los archivos se descargan con enlaces temporales y siempre como adjunto, de modo que no se ejecutan ni se visualizan en línea.',
          'Verificamos el contenido real de los archivos que se suben, no solo la extensión que declara el navegador.',
          'Las sesiones tienen expiración y se puede activar la verificación en dos pasos.',
          'No almacenamos números completos de tarjeta: se tokenizan en el navegador y solo se conserva el token de la transacción.',
        ],
      },
    ],
  },
  {
    id: 'menores',
    title: 'Menores de edad',
    blocks: [
      {
        kind: 'p',
        text: 'Los datos de los niños y adolescentes son sensibles por ley y requieren autorización expresa de su representante legal. Fixtra no verifica la edad de los clientes que registran los talleres, por lo que es responsabilidad del taller identificar cuándo el titular es un menor de edad y obtener la autorización de su representante legal antes de registrar sus datos.',
      },
    ],
  },
  {
    id: 'comprobante',
    title: 'Autorización para adjuntar un comprobante de pago',
    blocks: [
      {
        kind: 'p',
        text: 'Cuando un cliente adjunta un comprobante de pago desde la página de seguimiento de su orden, su imagen y los datos del pago quedan registrados. El comprobante no aprueba el pago por sí solo: el taller lo revisa contra sus movimientos y decide. El texto que el cliente acepta al enviarlo es el siguiente:',
      },
      {
        kind: 'note',
        text: 'Autorizo al taller a tratar la imagen de mi comprobante de pago y los datos del pago que transcriba (monto, fecha y referencia o nombre del remitente), con la única finalidad de verificar y conciliar este pago. Entiendo que el comprobante no constituye por sí solo una aprobación del pago, que el taller decide si el pago fue recibido, y que la imagen del comprobante se eliminará 90 días después de la resolución del pago, o 15 días después si el pago queda pendiente de revisión. Los datos del pago se conservarán por 5 años como soporte contable. Puedo solicitar la eliminación de la imagen y la información sobre el tratamiento de mis datos en jmgg.95n@gmail.com.',
      },
    ],
  },
  {
    id: 'cambios',
    title: 'Cambios en este aviso',
    blocks: [
      {
        kind: 'p',
        text: 'Actualizamos este aviso cuando cambian los datos que tratamos o las finalidades para las que los usamos. La fecha de la última actualización aparece al inicio de esta página, y los cambios sustanciales se avisarán a los talleres por correo electrónico.',
      },
    ],
  },
];
