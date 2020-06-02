FROM node:12-alpine

RUN mkdir /usr/api

WORKDIR /usr/api

COPY package.json .

RUN npm install

COPY . .

RUN /usr/api/node_modules/.bin/pm2 install typescript

CMD ["npm", "run", "develop"]
# CMD ["npm", "start"]
