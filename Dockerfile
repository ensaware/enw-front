FROM node:19.9.0

ENV APP_HOME /app
COPY . .

RUN pnpm install
RUN pnpm next build

CMD ["pnpm", "next" "start"]
EXPOSE 3000
