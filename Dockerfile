# ==== CONFIGURE =====
# Use a Node 16 base image
FROM registry.access.redhat.com/ubi8/nodejs-16
# Set the working directory to /app inside the container
USER root
RUN dnf -y update-minimal --security --sec-severity=Important \
    --sec-severity=Critical && dnf clean all

USER 1001

WORKDIR /opt/app-root/src

# Copy app files
COPY package.json package-lock.json .env.development .env.production ./
COPY src ./src
COPY public ./public

# ==== BUILD =====
RUN npm ci && npm run build && npm install -g serve
# ==== RUN =======

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3001
# Start the app
CMD serve -s build -l 3001