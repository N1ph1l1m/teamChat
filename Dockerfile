FROM node:20.12.2 as build


COPY package.json  packege.json
RUN npm install

COPY . .
RUN npm cache clean --force && npm install

FROM nginx:stable-alpine

COPY --from=build /dist /usr/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx" , "-g" , "daemon off;" ]
