FROM node

COPY src /usr/share/js

# For testing and debugging, better than native cat
RUN apt-get update && \
    apt-get install -y vim tcpdump

WORKDIR /usr/share/js
RUN npm install

EXPOSE 2205

ENTRYPOINT ["node", "/usr/share/js/index.js"]