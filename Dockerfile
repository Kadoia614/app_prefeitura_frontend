FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]