FROM node:19.9.0

RUN npm install -g pnpm

ENV APP_HOME /app
COPY . .

RUN pnpm install
RUN pnpm next build

EXPOSE 3000
CMD ["pnpm", "next" "start"]
