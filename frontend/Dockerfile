FROM nginx:stable-alpine

WORKDIR /frontend

RUN apk add npm

COPY package*.json /frontend/
RUN npm ci --omit=dev

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nfld.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
