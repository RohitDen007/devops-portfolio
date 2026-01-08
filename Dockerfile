FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create app directory and copy ALL portfolio files
RUN mkdir -p /app
COPY . /app/

# Ensure permissions are correct
RUN chmod -R 755 /app

# Expose port 10000 (Render's requirement)
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:10000/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
