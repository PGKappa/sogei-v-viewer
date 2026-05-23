FROM  node:18-alpine3.15 AS buildviewer

ENV IS_ENABLED_DOGS6=true
ENV V_VIEWER_DOGS6_PARTNER  'stanleybet'
ENV V_VIEWER_DOGS6_INDEX_TITLE '"PGVirtual V-Viewer"'
ENV V_VIEWER_DOGS6_API_ENDPOINT \'http://10.200.1.87:8080/api\'
#ENV V_VIEWER_DOGS6_API_ENDPOINT=(function(){return document.location.protocol + "//" + document.location.hostname + ":9900/dogs6"}())
ENV V_VIEWER_DOGS6_JS_ENTRYPOINT=v-viewer-dogs6.min.js
ENV V_VIEWER_DOGS6_VARS var v_param__show_partner_logo = 1, \
    v_param__full = 1, \
    v_param__audio = 1,\
    v_param__gui_layout_version = '"v2"',\
    v_param__operator = '"pg"',\
    v_param__hide_channel = 1, \
    v_param_pal_start='"09:29"', \
    v_param_pal_end='"02:04"';

RUN mkdir -p /root/v-viewer
WORKDIR /root/v-viewer
COPY . /root/v-viewer
RUN  sh -c "yarn install && yarn dist"

FROM nginx:1.21.6-alpine
COPY ./misc/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./misc/root/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./misc/nginx404.html /usr/share/nginx/html/404.html
RUN mkdir -p /v-viewer

COPY --from=buildviewer /root/v-viewer/dist/v-viewer/. /v-viewer
WORKDIR /v-viewer
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]