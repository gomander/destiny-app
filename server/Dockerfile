FROM node:18-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm ci --omit=dev
COPY . ./
CMD [ "npm", "run", "start" ]
