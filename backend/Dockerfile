FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /back

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["npm", "run", "dev"]