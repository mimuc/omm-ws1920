# select a base image
FROM node:alpine
# define your application working directory
WORKDIR /app
# in the next command, ADD adds ./src from host to WORKDIR in container
ADD . .
# install dependencies for your application
RUN npm install
# define commands to run your container (app)
CMD ["npm", "start"]