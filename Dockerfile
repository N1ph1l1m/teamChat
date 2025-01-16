FROM node:22.13

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "set", "HOST=192.168.77.11","npm" , "start"]
