FROM node:14.17.0

COPY src /usr/share/js

# For testing and debugging, better than native cat
RUN apt-get update && \
    apt-get install -y vim

WORKDIR /usr/share/js
RUN npm install


ENTRYPOINT ["node", "/usr/share/js/index.js"]