# syntax=docker/dockerfile:1

# ---------- Build stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Dependencies first, so the layer cache survives source-only edits
COPY package.json package-lock.json ./
RUN npm ci

# Rest of the project (see .dockerignore for what is left out)
COPY . .

# Both are inlined at build time, so they must be present here and not at runtime.
#
# SITE_URL        read by astro.config.mjs: enables sitemap, canonical and og:url.
# PUBLIC_API_URL  read by src/data/plans.ts: backend serving GET /api/billing/planes.
#                 The build fetches the plan catalog over the network and falls
#                 back to src/data/site.ts when the API does not answer.
ARG SITE_URL=""
ARG PUBLIC_API_URL=""
ENV SITE_URL=$SITE_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
