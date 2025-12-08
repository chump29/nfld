#!/usr/bin/env -S docker build . --tag=nfld-frontend --file

FROM node:24-alpine AS build

RUN corepack enable pnpm

ENV PATH="/pnmp:$PATH"

WORKDIR /app

COPY package.json pnpm-*.yaml ./

RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# -=-

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
