
# FROM node:alpine as builder
# WORKDIR /app
# COPY . .
# RUN yarn config set registry https://registry.npm.taobao.org && yarn
# RUN yarn build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /var/www/html
# COPY --from=builder /app/build /usr/share/nginx/html


