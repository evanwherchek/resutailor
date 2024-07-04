FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
RUN npm run build --prod

FROM nginx:alpine
COPY /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]