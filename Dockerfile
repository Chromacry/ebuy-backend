# syntax=docker/dockerfile:1
FROM node:20.11.0

ARG DATABASE_HOST
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_PORT
ARG DATABASE_SCHEMA
ARG JWT_SECRET
ARG JWT_EXPIRES
ARG SERVER_PORT
ARG DOCKER_IMAGE_REPO

ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_SCHEMA=${DATABASE_SCHEMA}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES=${JWT_EXPIRES}
ENV SERVER_PORT=${SERVER_PORT}
ENV DOCKER_IMAGE_REPO=${DOCKER_IMAGE_REPO}

ENV NODE_ENV=development
WORKDIR /projectx-backend

# COPY package*.json .
COPY . .

RUN npm install
# RUN npm install -g nodemon
RUN npm rebuild bcrypt --build-from-source

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY ${PM2_PUBLIC_KEY}
ENV PM2_SECRET_KEY ${PM2_SECRET_KEY}

CMD ["pm2-runtime", "src/index.mjs"]
EXPOSE 8080
EXPOSE 80
EXPOSE 443

# CMD [ "npm", "start" ]