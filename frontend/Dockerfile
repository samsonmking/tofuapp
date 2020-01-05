FROM node:10-alpine as frontend
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run prod:build

FROM nginx:1.16-alpine
COPY --from=frontend /usr/src/app/dist/tofu /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./tofuapp.cc.conf /etc/nginx/conf.d