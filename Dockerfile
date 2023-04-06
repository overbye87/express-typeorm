FROM node:16.13.2-alpine AS builder

## set work directory.
WORKDIR /opt/app/

## copy package.json for correct first installation on the packages.
COPY . .

# ## install packages.
RUN npm install
RUN npm i nodemon
# RUN npm run start

CMD ["npm","run","start"]
