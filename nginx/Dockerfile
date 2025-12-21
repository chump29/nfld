#!/usr/bin/env -S docker build . --tag=nfld-nginx --file

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY healthcheck.sh /usr/share/nginx/html/

HEALTHCHECK --interval=60s CMD source /usr/share/nginx/html/healthcheck.sh

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
