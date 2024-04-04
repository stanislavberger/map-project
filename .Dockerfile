# Use an existing image as a base
FROM nginx:latest

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the source code from your local machine to the container
COPY E:/OSPanel/domains/myportfolio.ru/map/ .

# Expose port 80 to allow external access
EXPOSE 80