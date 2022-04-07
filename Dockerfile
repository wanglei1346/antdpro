FROM nginx:latest
COPY dist/ /usr/share/nginx/html/
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]