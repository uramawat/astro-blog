# syntax=docker/dockerfile:1

# Stage 1: Build the static site.
# Use Debian, not Alpine. The Pagefind and Sharp binaries need glibc.
FROM node:22-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Stage 2: Serve the static files with nginx.
# This image runs nginx as a non-root user.
FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

# nginx listens on this port. Hosts such as Cloud Run and Render set PORT.
ENV PORT=8080

# The nginx entrypoint replaces ${PORT} in the template at startup.
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1
