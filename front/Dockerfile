#FROM node:latest as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#COPY ./ .
#RUN npm run build

FROM nginx:latest
RUN mkdir /app
RUN chown nginx:nginx /usr/share/nginx/html
#COPY --from=build-stage /app/dist/front/ /app
COPY ./dist/front/ /app
COPY nginx.conf /etc/nginx/nginx.conf
