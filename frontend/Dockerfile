#!/usr/bin/env -S docker build . --tag=nfld-frontend --file

FROM node:24-alpine AS build

RUN corepack enable pnpm

ENV PATH="/pnmp:$PATH"

WORKDIR /app

COPY package.json pnpm-*.yaml ./

RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm run prod

# -=-

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm -f /usr/share/nginx/html/50x.html

EXPOSE 80
