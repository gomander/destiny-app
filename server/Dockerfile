FROM node:22-slim
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i --omit=dev
COPY . .
USER node
CMD [ "npm", "run", "start" ]
