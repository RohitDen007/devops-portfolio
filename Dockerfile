FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy portfolio files
COPY . /app

# Expose port 10000 (Render's requirement)
EXPOSE 10000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
