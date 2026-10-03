# Landing: spec de secciones

> Every screen must read as the same product if placed side by side.
> Binds to `.ulpi/design/DESIGN.md`. Cualquier valor fuera de ese archivo es un defecto.

## Objetivo y usuario

- **Usuario:** dueño o jefe de técnicos de un taller de reparación de celulares, computadores y consolas
  en Latinoamérica. Hoy usa cuaderno, Excel o WhatsApp. Llega desde el móvil (≈ 70%) o desde la PC del mostrador.
- **Objetivo:** que pida una demo. Secundario: que un usuario existente encuentre "Ingresar".
- **Mensaje central:** "Cada equipo que entra a tu taller, ubicado, con su estado y su cliente informado."

## Flujo principal

```
Llega (hero) → entiende el ticket/QR (scroll del ticket) → se reconoce (dispositivos + antes/después)
→ ve funciones (bento) → ve el flujo de 4 pasos → resuelve dudas (FAQ) → Pedir demo (CTA)
```
Rama: usuario existente → "Ingresar" en nav → `https://repair.jglabs.tech/login` (misma pestaña).

## Orden de secciones y familias de layout

| # | Sección | Familia de layout | Fondo |
|---|---------|-------------------|-------|
| 1 | Nav | barra mínima sticky | graphite → bench al salir del hero |
| 2 | Hero + ticket | split asimétrico 7/5 con escena pineada | graphite |
| 3 | Frentes de trabajo | stat strip reglado (4 celdas) | graphite (continuación) |
| 4 | Antes / Después | matriz de comparación reglada | bench |
| 5 | Funciones | bento asimétrico (QR = celda grande) | bench |
| 6 | Flujo | línea horizontal de 5 pasos (secuencia real) | surface |
| 7 | Capturas (condicional) | producto en contexto, 1 grande + 2 chicas | bench |
| 8 | FAQ | editorial 2 columnas: título izq, lista reglada der | bench |
| 9 | CTA | bloque drenched kapton | kapton |
| 10 | Footer | barra reglada | graphite |

6 familias distintas. Ninguna fila de 3 cards iguales. Cero cards anidadas.

---

## Componentes

### 1. Nav
- **Contenido:** logo (ícono `wrench` en cuadrado kapton radio md + "Taller de Reparaciones" en Archivo 700),
  links ancla: Funciones · Cómo funciona · Preguntas (3, ≤ 5), "Ingresar" (texto), "Pedir demo" (botón kapton).
- **Estados:** sobre hero = fondo graphite, texto on-dark. Al pasar el hero = bench/95 con borde inferior
  `border` (IntersectionObserver sobre el hero; sin JS → queda graphite, sigue legible).
- **Mobile < 768:** se ocultan los links ancla; quedan logo, "Ingresar", "Pedir demo" (sm). Sin menú hamburguesa (no hace falta con 3 links).
- **A11y:** `<nav aria-label="Principal">`, skip link "Saltar al contenido" (primer foco, z skipLink), foco visible 2px kapton offset 2.

### 2. Hero + Ticket (SIGNATURE)
- **Izquierda (7 col):** label mono "SOFTWARE PARA SERVICIO TÉCNICO" en cinta kapton (texto ink).
  H1 Archivo expandida 800: **"Cada equipo en tu mostrador, ubicado y con su cliente al tanto."**
  Bajada Plex 1.125rem on-dark-muted: "Órdenes, seguimiento por QR, repuestos, técnicos y facturación para talleres de celulares, computadores y consolas."
  CTAs: "Pedir demo" (kapton, primario) + "Ver cómo funciona" (borde on-dark-muted, secundario, ancla #como-funciona).
- **Derecha (5 col): escena del ticket.**
  - Ranura de impresora: barra graphite-elevated radio md, 100% ancho del ticket + 16px, con línea interior oscura (la boca).
  - Ticket: surface, radio sm arriba, borde inferior dentado (`mask` con conic/radial gradient, dientes 8px), sombra `ticket`.
    Contenido en Plex Mono 0.8125rem, ink:
    ```
    TALLER DE REPARACIONES
    ORDEN  #1048            03/10/2026
    ----------------------------------
    EQUIPO   PlayStation 5
    FALLA    No da video (HDMI)
    TÉCNICO  Andrés R.
    ----------------------------------
    [ ] REGISTRADO
    [ ] EN DIAGNÓSTICO
    [ ] EN REPARACIÓN
    [ ] CONTROL DE CALIDAD
    [ ] LISTA PARA RETIRO
    ----------------------------------
    [QR real 96px]  Escanea para ver
                    el estado de tu equipo
    ```
    El QR es SVG real que apunta a `https://repair.jglabs.tech` (generado en build, sin JS cliente).
  - Sello: círculo `full`, borde 3px kapton-ink, texto mono "LISTA PARA RETIRO" en 3 líneas, rotado −8°, sobre el lado derecho de la lista de estados (no tapa el QR), aparece al final.
- **Secuencia GSAP (desktop ≥ 1024 y sin reduced-motion):**
  - ScrollTrigger con `pin` de la sección, `scrub: 0.6`, duración ≈ 150vh.
  - 0–20%: el ticket se "imprime" de arriba hacia abajo (`clip-path: inset(0 0 82% 0)` → `inset(0)`), arrancando con el encabezado asomado bajo la ranura.
  - 20–85%: cada estado se marca en orden: `[ ]` → `[■]` + texto pasa de muted a ink; el estado activo tiene un subrayado cinta kapton. Un chip arriba del ticket cambia de texto con el estado actual y su color semántico (info/warning/success).
  - 85–100%: el sello entra (scale 1.15 → 1, opacity 0 → 1, 500ms equivalentes) y el QR recibe un borde kapton.
  - Por qué existe esta animación: muestra en 3 segundos lo que el cliente del taller ve, sin texto.
- **Mobile / tablet < 1024:** sin pin ni scrub. El ticket se muestra en su estado final (igual que sin JS), debajo del H1.
- **Reduced motion:** estado final estático (todos marcados, sello visible). Cero animaciones.
- **Sin JS:** se renderiza el estado final estático (es el HTML por defecto; GSAP solo anima desde el estado inicial cuando carga).
- **A11y:** el ticket es `<figure>` con `<figcaption class="sr-only">` "Ejemplo de ticket de reparación con código QR para que el cliente siga el estado de su equipo." La lista de estados es `<ol>` real. Los cambios animados NO se anuncian (decorativos, `aria-hidden` en el chip animado).

### 3. Frentes de trabajo (stat strip)
- 4 celdas regladas (bordes 1px graphite-elevated) en una fila: Celulares (`smartphone`), Computadores (`laptop`), Consolas (`gamepad-2`), Tablets (`tablet`).
  Cada celda: ícono 28px kapton + nombre Archivo 700 on-dark + una línea mono on-dark-muted con ejemplos de marcas/modelos genéricos ("iPhone, Samsung, Xiaomi", "Notebooks y PC de escritorio", "PlayStation, Xbox, Nintendo Switch", "iPad y Android").
- Mobile: 2×2. Sin interacción.

### 4. Antes / Después (matriz)
- H2: **"Lo que cambia en el mostrador."**
- Tabla real (`<table>`, `<caption class="sr-only">`) con 3 columnas: Situación · Sin sistema · Con Taller de Reparaciones. 5 filas:
  1. El cliente pregunta por su equipo · Te llama o te escribe varias veces · Escanea el QR del ticket y lo ve solo
  2. Buscar un equipo · Revisar el cuaderno y los estantes · Buscar por orden, cliente o modelo
  3. Saber si hay un repuesto · Ir a mirar la caja · Stock al día con alerta de faltantes
  4. Quién está con qué equipo · Preguntar en el taller · Cada orden tiene su técnico asignado
  5. Cobrar la reparación · Factura a mano o en otro programa · Factura impresa desde la orden
- Columna "Con..." en ink 600 con ícono `check` success; "Sin sistema" en muted con `x` subtle (decorativo, aria-hidden).
- Mobile < 768: cada fila se vuelve bloque apilado (situación como título mono, luego las dos respuestas con su etiqueta visible). Mantener semántica con `data-label` + CSS, no duplicar contenido.

### 5. Funciones (bento)
- H2: **"Un solo sistema para todo el taller."**
- Grilla 6 columnas desktop:
  - **QR (col 1–4, fila 1–2, celda grande, fondo graphite, texto on-dark):** "Seguimiento por QR. Tu cliente ve el estado de su equipo desde el celular, sin crear cuenta." + mini representación de la página pública: lista de los 5 estados (mismo componente de estados del ticket, sin animar).
  - Órdenes con línea de tiempo (col 5–6)
  - Repuestos e inventario con alerta de stock bajo (col 5–6) + chip etiqueta "STOCK BAJO" warning
  - Técnicos y roles (col 1–2, fila 3)
  - Facturación y pagos (col 3–4, fila 3)
  - Dashboard de métricas (col 5–6, fila 3)
- Celdas: surface, borde 1px border, radio lg, padding 24. Sin sombra. Ícono Lucide 24 kapton-ink.
- Hover (solo pointer fine): borde pasa a ink, 120ms. No translate.
- Mobile: una columna; QR primero.

### 6. Flujo (5 pasos, secuencia real → numeración permitida)
- H2: **"De la recepción a la entrega."**
- Línea horizontal 1px ink con 5 nodos (cuadrado 12px kapton, radio sm). Bajo cada nodo: número mono "01".."05", título Archivo 700, texto Plex muted.
  1. Recibes el equipo · Creas la orden con marca, modelo, falla y cliente.
  2. Entregas el ticket · El cliente se lleva su QR.
  3. Diagnosticas y reparas · El técnico actualiza el estado y descuenta repuestos.
  4. Controlas la calidad · Revisas antes de avisar.
  5. Facturas y entregas · Imprimes la factura, registras el pago y cierras la orden.
- Reveal: un único stagger de los 5 nodos al entrar en viewport (IntersectionObserver + CSS, 60ms de stagger, base 280ms). Reduced motion: sin reveal.
- Mobile: línea vertical a la izquierda.

### 7. Capturas (CONDICIONAL)
- Se renderiza SOLO si existen imágenes en `src/assets/screenshots/` (dashboard.png, orden.png, estado-publico.png). Si no existen, la sección no se monta (nada de placeholders ni capturas falsas hechas con divs).
- Layout: 1 grande (dashboard) + 2 chicas apiladas. Marco: borde 1px border, radio lg, barra superior graphite 28px con 3 puntos subtle (aria-hidden).
- `<Image>` de Astro (AVIF/WebP, `loading="lazy"`, `alt` descriptivo por imagen).

### 8. FAQ
- 2 columnas desktop: izquierda H2 **"Preguntas frecuentes"** + texto "¿Otra duda? Escríbenos." con link a CTA; derecha lista reglada de `<details>`.
- Preguntas (tuteo):
  1. ¿Necesito instalar algo? · No. Funciona desde el navegador en computador, tablet o celular.
  2. ¿Sirve para computadores y consolas, o solo celulares? · Sirve para cualquier equipo. Registras marca y modelo de lo que llegue al mostrador.
  3. ¿Mis clientes necesitan una cuenta? · No. Escanean el QR del ticket y ven el estado en una página pública.
  4. ¿Puedo tener varios técnicos? · Sí. Cada técnico tiene su usuario y su rol.
  5. ¿Puedo usar la marca de mi taller? · Sí. Configuras los datos y el color de tu taller.
- `summary`: Plex 600 ink, ícono `plus` que rota 45° (120ms). Foco visible en `summary`.

### 9. CTA (drenched kapton)
- Fondo kapton full-bleed, texto ink. H2 Archivo 800: **"Tu próximo equipo, ya con ticket y QR."**
  Bajada: "Te mostramos el sistema funcionando con un taller real."
- Botones: "Pedir demo" (fondo ink, texto on-dark, primario) → `mailto:` desde `site.ts` · "Escribir por WhatsApp" (borde ink) → `https://wa.me/<num>` SOLO si `site.whatsapp` tiene valor; si está vacío, el botón no se renderiza.
- Patrón decorativo: una franja de cinta diagonal tenue (ink 6% opacidad) es la ÚNICA decoración. Opcional.

### 10. Footer
- graphite, on-dark-muted. "© {año} Taller de Reparaciones · JG Labs" · links: Aplicación, Contacto. Bordes regladores arriba.

---

## Estados y casos borde

| Caso | Comportamiento |
|------|----------------|
| JS deshabilitado / falla GSAP | HTML muestra estado final del ticket; todo el contenido visible; nav queda graphite |
| `prefers-reduced-motion: reduce` | Sin pin, sin scrub, sin reveals; estados finales |
| Viewport < 1024 | Sin pin; entrada única del ticket |
| Resize cruzando 1024 | `gsap.matchMedia()` revierte/crea triggers limpiamente |
| Fuentes lentas | `display=swap` + fallback con métricas ajustadas (`size-adjust`) para evitar CLS |
| Sin capturas | Sección 7 no se monta |
| Sin WhatsApp | Botón WhatsApp no se monta |
| Ancla desde nav con nav sticky | `scroll-margin-top` = alto del nav en cada sección |
| Volver atrás (back) al hero pineado | ScrollTrigger recalcula en `load`; sin saltos |

## Accesibilidad

- Contrastes: ver tabla en DESIGN.md (todos ≥ 4.5 texto, ≥ 3 UI).
- Orden de foco: skip link → logo → links nav → Ingresar → Pedir demo → CTAs hero → … → FAQ summaries → CTA → footer.
- Foco: `outline: 2px solid kapton; outline-offset: 2px` en todo elemento interactivo (sobre fondo kapton: outline ink).
- Touch targets ≥ 44px de alto en botones y summaries.
- Un solo `<h1>`; H2 por sección; `lang="es"`.
- Íconos decorativos con `aria-hidden="true"`.

## Contenido a actualizar en `src/data/site.ts`

- Todo el copy pasa a tuteo neutro (hoy está en voseo: "Registrá", "Controlá" → "Registra", "Controla").
- Nombrar celulares, computadores y consolas en description, hero, FAQ.
- CTA unificado: "Pedir demo" (reemplaza "Solicitar demo").
- Sin em-dashes, sin cifras, sin testimonios.

---

## Build handoff

- **Agente:** sitio estático Astro (sin SSR) → `general-purpose` con estas reglas (no hay agente Astro dedicado).
- **design_system:** bespoke. Tailwind 4 con tokens de DESIGN.md en `@theme` (nombres semánticos: `bg-bench`, `bg-graphite`, `text-ink`, `text-muted`, `bg-kapton`, `text-kapton-ink`, etc.). Prohibido usar colores crudos de Tailwind (`slate-*`, `blue-*`).
- **Dependencias permitidas:** `gsap` (con ScrollTrigger, carga solo en el hero vía `<script>` de Astro), `lucide` íconos (como SVG en build: `@lucide/astro` o `lucide-static`), `qrcode` (generar SVG del QR en build). Nada de React, nada de shadcn.
- **Instrucción:** *"Implement exactly this spec. Theme with our locked tokens; do NOT redesign."*

### Criterios de aceptación
1. `npm run build` sin errores; página única estática.
2. 0 valores de color/radio/fuente fuera de DESIGN.md (`rg "slate-|blue-|#2563eb"` vacío en `src/`).
3. Ticket: estado final visible sin JS; secuencia scroll en desktop; estático con reduced motion.
4. QR escaneable apuntando a `https://repair.jglabs.tech`.
5. Copy en tuteo, sin em-dash (`rg "—" src/` vacío), nombra celulares, computadores y consolas.
6. Sin scroll horizontal a 360px; touch targets ≥ 44px.
7. Lighthouse móvil: Accesibilidad ≥ 95, Performance ≥ 90.
8. JS enviado al cliente solo en el hero (GSAP) y los observers; resto 0 JS.
