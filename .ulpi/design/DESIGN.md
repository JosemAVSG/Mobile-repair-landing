---
project: Taller de Reparaciones (landing)
register: brand
aesthetic_direction: industrial / signage, con base technical / utilitarian
color_strategy: restrained
design_system: bespoke
design_variance: 7
motion_intensity: 5
visual_density: 5
---

# DESIGN.md (LOCKED)

> Every screen must read as the same product if placed side by side.

## Design Read

Mostrador técnico, no startup: el lenguaje del taller real (ticket térmico, cinta Kapton, etiquetas de
inventario, banco de trabajo grafito) aplicado con precisión. La apuesta: un técnico de celulares,
computadores o consolas tiene que sentir "esto lo hizo alguien que conoce mi mostrador".

## Signature

**El ticket de reparación.** Un ticket térmico (papel blanco frío, borde inferior dentado, tipografía
mono, QR) que sale de una ranura de impresora en el hero y, al hacer scroll, va sellando los estados
REGISTRADO → EN DIAGNÓSTICO → EN REPARACIÓN → CONTROL DE CALIDAD → LISTA PARA RETIRO, terminando con el sello y el QR.

Por qué: el ticket con QR es el objeto físico que la app realmente imprime y que el cliente se lleva a
casa. Es el diferencial del producto convertido en imagen. Toda la audacia vive acá; el resto de la
página es sobrio.

Motivos secundarios permitidos (solo estos): **cinta Kapton** (franja ámbar como etiqueta de sección o
highlight), **etiqueta de inventario** (chip rectangular mono, radio sm). Nada más decorativo.

## Color (locked)

Neutros teñidos hacia azul acero (hue 250–255). Distribución 60-30-10: 60% `bench`/`surface`,
30% `graphite`/`ink`, 10% `kapton`.

| role | OKLCH | hex | use |
|------|-------|-----|-----|
| bench (background) | oklch(0.965 0.006 250) | #f0f4f7 | fondo de página claro |
| surface | oklch(0.995 0.003 250) | #fcfeff | ticket, filas, bloques |
| graphite (dark bg) | oklch(0.215 0.012 255) | #161a1f | hero y CTA oscuros |
| graphite-elevated | oklch(0.28 0.014 255) | #242930 | ranura impresora, celdas sobre grafito |
| ink (text) | oklch(0.22 0.015 255) | #161b22 | texto principal sobre claro |
| muted | oklch(0.47 0.018 255) | #545c65 | texto secundario |
| subtle | oklch(0.62 0.015 255) | #80878f | SOLO decorativo / texto ≥ 24px |
| border | oklch(0.88 0.008 250) | #d4d8dd | reglas, divisores |
| on-dark | oklch(0.96 0.006 250) | #eff2f6 | texto sobre grafito |
| on-dark-muted | oklch(0.74 0.014 255) | #a5abb4 | texto secundario sobre grafito |
| **kapton (accent, único)** | oklch(0.79 0.155 72) | #f7a830 | fills: botón primario, cinta, sello. Texto encima SIEMPRE `ink` |
| kapton-ink | oklch(0.52 0.12 62) | #995600 | el accent cuando debe ser TEXTO sobre claro |
| success | oklch(0.55 0.13 150) | #298646 | estado "Lista para retiro" / "Pagado" |
| warning | oklch(0.56 0.13 72) | #a26900 | estado "En reparación", stock bajo |
| danger | oklch(0.55 0.19 27) | #c9302d | errores de formulario |
| info | oklch(0.52 0.12 245) | #196ea9 | estado "Diagnóstico" |

Contraste (WCAG AA verificado):
ink/bench 15.6 · ink/surface 17.1 · muted/bench 6.2 · on-dark/graphite 15.6 ·
on-dark-muted/graphite 7.6 · kapton/graphite 8.8 · ink/kapton 8.7 · kapton-ink/bench 5.2 ·
success/surface 4.5 · danger/surface 5.3 · info/surface 5.4 · warning/surface ≥ 4.5 (L 0.56).
`subtle` (3.6) nunca para texto de cuerpo.

Prohibido: degradados violeta/azul, texto con degradado, el azul #2563eb anterior, glassmorphism.

## Type (locked)

| role | family | use | notes |
|------|--------|-----|-------|
| display | **Archivo** (eje wdth 112–125, peso 700–800) | H1, H2, números grandes | expandida = cartelería de taller; tracking −0.02em ≥ 40px; `text-wrap: balance` |
| body | **IBM Plex Sans** 400/500/600 | párrafos, UI | measure 60–70ch |
| utility | **IBM Plex Mono** 400/500 | ticket, chips de etiqueta, datos, labels de sección | MAYÚSCULAS + tracking 0.06em en labels |

Eje de contraste: ancho (Archivo expandida vs Plex normal) + mono para datos. Google Fonts, `display=swap`.

Escala (rem): 0.75 · 0.875 · 1 · 1.125 · 1.375 · 1.75 · 2.25 · 3 · 4 (hero desktop) · mobile H1 2.5.

## Scales (locked)

- spacing: 4px base → 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (Tailwind 1,2,3,4,6,8,12,16,24,32).
- radius: `{ sm: 2px, md: 6px, lg: 10px, full: 9999 }`. Ticket = sm. Botones = md. Nada > 10px salvo `full` en el sello circular.
- borders: 1px `border` como lenguaje principal de separación (filas regladas), sombras casi nulas.
- shadow: solo `ticket` = `0 18px 40px -20px oklch(0.22 0.015 255 / 0.45)`. Ninguna otra.
- icons: **Lucide** (stroke 1.75), una sola familia. Íconos de dispositivo: smartphone, laptop, gamepad-2, tablet.
- motion: fast 120ms · base 280ms · emphasis 500ms; easing `cubic-bezier(0.16, 1, 0.3, 1)`; sin bounce;
  `prefers-reduced-motion` → estado final estático, sin scroll-scrub.

## Voice

- register: claro, directo, de oficio. Tuteo neutro latinoamericano ("registra", "tu taller"). Nada de voseo.
- dispositivos: siempre nombrar los tres frentes: **celulares, computadores y consolas** (tablets opcional).
- action vocabulary: "Pedir demo" (CTA primario, idéntico en toda la página) · "Ingresar" (login).
- estados del equipo, idénticos a la app: Registrado · En diagnóstico · En reparación · Esperando repuesto · Control de calidad · Lista para retiro · Pagado (fuente: StatusBadge.tsx del front).
- prohibido: em-dash (—), buzzwords (potente, revoluciona, sin fricción, next-gen), cifras inventadas, testimonios inventados.
