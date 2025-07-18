FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile --prod
USER node
CMD ["pnpm", "start"]
