FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm i --omit=dev
COPY . ./
CMD [ "npm", "run", "start" ]
