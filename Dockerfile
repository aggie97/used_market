FROM node:16-alpine

WORKDIR /used_market
COPY package.json /used_market/
COPY yarn.lock /used_market/
RUN yarn install

COPY . .
RUN yarn build
CMD yarn start