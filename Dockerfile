FROM node:18-alpine AS builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM nginx:alpine

ENV HOST="http://host.docker.internal"

ENV PORT=8080

COPY ./docker-conf/nginx/segment-admin-panel.conf.template /etc/nginx/conf.d/

COPY ./docker-conf/start.sh .

WORKDIR /var/www/html

COPY --from=builder /app/build .

EXPOSE 80

ENTRYPOINT ["/start.sh"]