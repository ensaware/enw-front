FROM node:19.9.0

WORKDIR /app

ENV NODE_ENV production

RUN yarn global add pnpm
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile -y
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm next build

EXPOSE 3000

CMD ["pnpm", "next", "start"]
