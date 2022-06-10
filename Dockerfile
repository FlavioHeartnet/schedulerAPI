FROM node:16

WORKDIR /app/src

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .

EXPOSE 3000
CMD [ "tsnd", "src/app.ts" ]