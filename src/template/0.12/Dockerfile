FROM daocloud.io/library/node:8.4.0

WORKDIR /var/workspace

COPY ["package.json", "yarn.lock*", "./"]

RUN npm config set registry https://registry.npm.taobao.org &&\
  npm config set @ytx:registry http://cnpm.98.cn:7001 &&\
  npm install --production

COPY . .

CMD npm start