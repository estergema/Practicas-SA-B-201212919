FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4003
ENV GOOGLE_API_KEY=
ENV PRODUCTS_API_URL=http://10.44.0.11:4001
ENV ORDERS_API_URL=http://10.44.0.5:4002
ENV GOOGLE_CLOUD_PROJECT_ID=spry-connection-456021-a3
ENV GOOGLE_CLOUD_LOCATION=us-central1
ENV GOOGLE_CLOUD_AGENT_ID=projects/spry-connection-456021-a3/locations/us-central1/agents/8ce34ea3-5433-49b2-b262-d6c9365e4996
ENV GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
EXPOSE 4003

CMD ["node", "index.js"]

