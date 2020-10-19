FROM node:10-slim
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT
RUN yarn

COPY . $APP_ROOT
