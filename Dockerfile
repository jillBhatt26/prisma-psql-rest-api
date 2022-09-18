FROM node:16.16.0-alpine as development

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

# RUN npm ci
RUN yarn install --immutable --immutable-cache --check-cache

COPY ./ ./

RUN npx prisma generate

RUN npm run build


FROM node:16.16.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache --production=true

RUN npx prisma generate

COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/cmd ./cmd

EXPOSE 5001

# CMD [ "node", "./dist/index.js" ]
CMD [ "sh", "./cmd/entrypoint-prod.sh" ]