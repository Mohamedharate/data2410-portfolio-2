# Dockerfile for running the shopmet server,
# which distributes the webpage.

FROM node:alpine

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY server /server/
COPY client/build ../client/build/

EXPOSE 3001

CMD ["node", "server.js"]