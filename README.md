# Fixtra · Landing

Landing page de **Fixtra**, software para talleres de servicio técnico de celulares, computadores, consolas y tablets.

## Stack

Astro 7 · Tailwind CSS 4 · GSAP (ScrollTrigger, solo en el hero) · QR generado en build.

## Desarrollo

Requiere Node >= 22.12 (`nvm use`).

```sh
npm install
npm run dev      # localhost:4321
npm run build    # genera ./dist
```

## Contenido

- Textos, links y contacto: `src/data/site.ts`
- Capturas de la app (opcional): `src/assets/screenshots/{dashboard,orden,estado-publico}.png`. La sección aparece sola si existen.
- Sistema de diseño bloqueado: `.ulpi/design/DESIGN.md`. Spec de secciones: `.ulpi/design/landing.md`.
