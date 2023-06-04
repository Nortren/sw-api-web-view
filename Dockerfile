FROM node:18.12 as dependencies
WORKDIR /sw-api-web-view

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:18.12 as builder
WORKDIR /sw-api-web-view
COPY . .
COPY --from=dependencies /sw-api-web-view/node_modules ./node_modules
RUN yarn build

FROM node:18.12 as runner

ARG BASE_URL
ARG PORT
ENV PORT ${PORT}
ENV BASE_URL ${BASE_URL}


WORKDIR /sw-api-web-view
ENV NODE_ENV production

COPY --from=builder /sw-api-web-view/package.json ./package.json
COPY --from=builder /sw-api-web-view/src/client/.next ./src/client/.next
COPY --from=builder /sw-api-web-view/dist ./dist
COPY --from=builder /sw-api-web-view/node_modules ./node_modules

EXPOSE ${BASE_URL}
CMD ["yarn", "start:prod"]