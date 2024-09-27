# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY server/. ./
COPY public ../public

# Expose the port your app runs on
EXPOSE 4004

# Start the app
CMD ["node", "server.js"]
