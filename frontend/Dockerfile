#!/usr/bin/env -S docker build . --tag=nfld-frontend --file

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm
# && corepack install -g pnpm@latest-10

WORKDIR /app
COPY . .

# -=-

FROM base AS dependencies

RUN --mount=type=cache,target=/pnpm/store pnpm fetch --frozen-lockfile --prod
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile --prod

# -=-

FROM base AS build

RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run prod

# -=-

FROM nginx:alpine AS frontend

WORKDIR /frontend

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /docker-entrypoint.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
