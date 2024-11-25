# FROM node:22.9.0-alpine3.19 AS constructor
# USER node
# WORKDIR /home/node/nest
# COPY --chown=node:node src /home/node/nest/src
# COPY --chown=node:node package.json /home/node/nest/package.json
# COPY --chown=node:node package-lock.json /home/node/nest/package-lock.json
# COPY --chown=node:node tsconfig.json /home/node/nest/tsconfig.json
# COPY --chown=node:node tsconfig.build.json /home/node/nest/tsconfig.build.json
# COPY --chown=node:node nest-cli.json /home/node/nest/nest-cli.json
# RUN npm install && npm run build && rm -rf node_modules && npm install --production

FROM node:22.9.0-alpine3.19
USER node
WORKDIR /home/node/nest
COPY /home/node/nest/dist  /home/node/nest/dist
COPY /home/node/nest/node_modules /home/node/nest/node_modules
COPY package.json /home/node/nest/package.json
COPY package-lock.json /home/node/nest/package-lock.json
CMD ["npm", "run", "start:dev"]