FROM node:19.9.0

RUN npm install -g pnpm

ENV APP_HOME /app
COPY . .

RUN pnpm install
RUN pnpm next build

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["pnpm", "next" "start"]
