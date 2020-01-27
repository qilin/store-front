FROM nginx:1.15.2-alpine

WORKDIR /usr/share/nginx/html

RUN apk --no-cache add tzdata bash ca-certificates \
    && rm -rf /tmp/* \
    && rm -rf /var/cache/apk/*

RUN rm -rf /etc/nginx/conf.d

COPY ./deployments/build/docker/app/files /
COPY ./packages/web/build .


RUN chmod +x /docker/bin/*

ENTRYPOINT ["/docker/bin/entrypoint.sh"]
