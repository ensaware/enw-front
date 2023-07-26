FROM node:19.9.0

RUN yarn global add pnpm

ENV APP_HOME /app
WORKDIR $APP_HOME

ENV NODE_ENV production

COPY . ./

RUN pnpm install --frozen-lockfile

RUN pnpm next build

EXPOSE 3000

CMD ["pnpm", "start"]
