FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4003
EXPOSE 4003

CMD ["node", "index.js"]

