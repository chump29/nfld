#!/usr/bin/env -S docker build . --tag=nfld-nginx --file

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK CMD curl -f http://localhost || exit 1

ENTRYPOINT ["nginx", "-g", "daemon off;"]
