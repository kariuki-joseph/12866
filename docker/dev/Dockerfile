# Use an official node image
FROM node:20.15.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
