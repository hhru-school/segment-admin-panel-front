FROM node:18-alpine AS builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn lint && yarn build


FROM nginx:alpine

ENV API_HOST="http://host.docker.internal"

ENV API_PORT=8080

ENV DOLLAR="$"

COPY ./docker-conf/nginx/segment-admin-panel.conf.template /etc/nginx/conf.d/

RUN envsubst < /etc/nginx/conf.d/segment-admin-panel.conf.template > /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

COPY --from=builder /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
