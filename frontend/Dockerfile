#!/usr/bin/env -S docker build . --tag=nfld-frontend --no-cache --file

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm && corepack install -g pnpm@latest-10

# -=-

FROM base AS dependencies

WORKDIR /dependencies

COPY pnpm-lock.yaml .
RUN --mount=type=cache,target=/pnpm/store pnpm fetch --frozen-lockfile
COPY package.json .
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile --prod --offline

# -=-

FROM nginx:alpine AS frontend

WORKDIR /frontend

COPY --from=dependencies /dependencies .
COPY dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /docker-entrypoint.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
