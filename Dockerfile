FROM node:10-alpine as frontend
WORKDIR /usr/src/app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

FROM node:10-alpine
WORKDIR /usr/src/app
RUN mkdir dist
COPY --from=frontend /usr/src/app/dist/tofu ./dist
COPY ./backend-api/package*.json ./
RUN npm install
COPY ./backend-api .
EXPOSE 3000
CMD [ "npm", "run", "prod"]