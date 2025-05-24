# Use official Node.js LTS image as the base
FROM node:22-slim AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Use a smaller image for production
FROM node:22-slim

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app ./

# Expose the backend port (change if needed)
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]