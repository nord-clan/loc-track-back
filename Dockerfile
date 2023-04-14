# ---- Node modules ---- #
FROM node:18.16.0-alpine AS node_modules

COPY package*.json ./
RUN pnpm install


# ---- Build ---- #
FROM node:18.16.0-alpine AS dist

COPY --from=node_modules node_modules ./node_modules
COPY . ./
RUN pnpm build


# ---- Release ---- #
FROM node:18.16.0-alpine

RUN apk update && apk upgrade -U -a \
  && apk add wget \
  && wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" \
  && chmod +x /bin/pnpm && pnpm i -g pnpm
RUN pnpm config set store-dir .pnpm-store
RUN corepack prepare pnpm@stable --activate

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD [ "pnpm", "start" ]