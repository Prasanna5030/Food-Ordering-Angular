# FROM node:alpine as build
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# FROM nginx:alpine
# COPY --from=build /food-ordering-app/dist/food-ordering-app /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN npm install
CMD ["ng", "serve","--host","0.0.0.0"]
