FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN cat package.json
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV VITE_URL_API_SOPORTE = http://34.71.132.103
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
