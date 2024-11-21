# Build App
FROM node:alpine3.20 as build

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
ARG REACT_APP_SERVER
ENV REACT_APP_SERVER=${REACT_APP_SERVER}
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
