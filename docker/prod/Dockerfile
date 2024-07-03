# Use an official node image as a build stage
FROM node:20.15.0-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the static files
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/dist /var/www/html/public

# Copy the Nginx configuration file
COPY ./docker/prod/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
