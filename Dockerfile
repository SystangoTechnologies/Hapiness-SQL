FROM node:10.15.3-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --only=production

RUN npm install pm2 -g

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "pm2.config.js"]