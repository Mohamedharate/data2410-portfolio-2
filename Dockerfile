# Use a lighter version of Node as a parent image
FROM node:14
# Set the working directory to /api
WORKDIR /server
# copy package.json into the container at /api
COPY package*.json /server/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY server /server/
# Make port 3000 available to the world outside this container
EXPOSE 3001
# Run the app when the container launches
CMD ["node", "server.js"]