FROM node:boron

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /app && cp -a /tmp/node_modules /app

WORKDIR /app
ADD . /app

EXPOSE 3034

CMD ["npm", " start"]
