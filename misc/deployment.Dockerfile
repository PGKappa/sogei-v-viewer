FROM nginx:1.21.6-alpine
COPY ./misc/nginx-deployment.conf /etc/nginx/conf.d/default.conf
COPY ./misc/nginx404-deployment.html /usr/share/nginx/html/404.html

COPY ./dist/v-viewer /v-viewer
