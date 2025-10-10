FROM node:20

WORKDIR /nestjs

COPY package.json .

RUN yarn install

# COPY src/prisma ./src/prisma 
COPY prisma ./prisma

RUN yarn prisma generate --schema prisma/schema-mysql.prisma

COPY . .

RUN yarn run build 

CMD ["yarn", "start:prod"]