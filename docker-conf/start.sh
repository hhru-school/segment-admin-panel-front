#!/bin/sh
export DOLLAR="$"
envsubst < /etc/nginx/conf.d/segment-admin-panel.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"
