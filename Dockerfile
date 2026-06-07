FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./output

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ARG APP_PORT=3000
ENV PORT=${APP_PORT}

EXPOSE ${APP_PORT}

CMD ["node", "output/server/index.mjs"]
