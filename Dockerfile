# syntax=docker/dockerfile:1
FROM node:20.11.0
ENV NODE_ENV=development
WORKDIR /projectx-backend

# COPY package*.json .
COPY . .

RUN npm install
# RUN npm install -g nodemon
RUN npm rebuild bcrypt --build-from-source

EXPOSE 8080

CMD [ "npm", "start" ]