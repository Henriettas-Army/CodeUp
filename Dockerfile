FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /app && cp -a /tmp/node_modules /app

RUN npm i -g webpack

WORKDIR /app
ADD . /app

RUN webpack

EXPOSE 80

CMD ["npm", "start"] 
