FROM node:16-alpine
ARG BASE_API
RUN apk add g++ make py3-pip
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc ./
RUN yarn install
COPY . .
RUN yarn build
ENV HOST=0.0.0.0
