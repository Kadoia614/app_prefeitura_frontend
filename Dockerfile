FROM node:lts-alpine AS builder

WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --silent

COPY . .

ARG NODE_ENV

RUN VITE_APP_NODE_ENV=$NODE_ENV npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/app_prefeitura
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]