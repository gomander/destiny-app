FROM node:lts-slim
WORKDIR /app
COPY . .
USER node
CMD ["node", "--env-file=.env", "."]
