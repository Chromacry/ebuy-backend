# syntax=docker/dockerfile:1
FROM node:20.11.0
ENV NODE_ENV=development
WORKDIR /projectx-backend

# COPY package*.json .
COPY . .

RUN npm install
# RUN npm install -g nodemon
RUN npm rebuild bcrypt --build-from-source

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY s0r2y9cwglf8ufp
ENV PM2_SECRET_KEY yvx18ugxlehgi29

CMD ["pm2-runtime", "src/index.mjs"]
EXPOSE 8080
EXPOSE 80
EXPOSE 443

# CMD [ "npm", "start" ]