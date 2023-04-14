# ---- Node modules ---- #
FROM node:18.16.0-alpine AS node_modules

COPY package*.json ./
RUN yarn install


# ---- Build ---- #
FROM node:18.16.0-alpine AS dist

COPY --from=node_modules node_modules ./node_modules
COPY . ./
RUN yarn build


# ---- Release ---- #
FROM node:18.16.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD [ "yarn", "start" ]