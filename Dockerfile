# Stage 1: Build the Angular app in a node.js environment
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine
COPY --from=build /app/dist/rod-manager-ui /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
