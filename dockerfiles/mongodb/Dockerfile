FROM couldworks/alpine-base:3.4

RUN echo "@testing http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --update mongodb@testing  \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /var/cache/apk/*

RUN mongod

EXPOSE 27017
EXPOSE 28017
