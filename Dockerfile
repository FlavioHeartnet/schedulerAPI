FROM node:16

WORKDIR /app/src

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "tsnd", "src/infra/http/express/app.ts" ]