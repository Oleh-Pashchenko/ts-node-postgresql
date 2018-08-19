FROM node:carbon

COPY . /var/www

WORKDIR /var/www

#VOLUME [ "/var/www", "/var/www/node_modules" ]

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]