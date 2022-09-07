# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public
COPY .env.development ./.env.development
COPY .env.production ./.env.production

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build

RUN npm install -g serve
# ==== RUN =======

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3001
# Start the app
CMD serve -s build -l 3001