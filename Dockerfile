FROM node:22-alpine

RUN mkdir -p /bone-frontend/app

COPY . /bone-frontend/app

WORKDIR /bone-frontend/app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]