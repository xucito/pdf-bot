FROM ubuntu:18.04
WORKDIR /app
COPY ./pdf-bot /app/

RUN mkdir /app/pdf-storage
RUN mkdir /app/pdf-storage/db
RUN mkdir /app/pdf-storage/pdf


RUN apt-get update
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
RUN apt-get install --yes npm
RUN apt-get install --assume-yes chromium-browser
RUN npm install -g pm2

COPY ./deployment-files/cronjob_shiftall /etc/cron.d/cronjob_shiftall

RUN apt-get -y install cron
RUN chmod 0644 /etc/cron.d/cronjob_shiftall
RUN crontab /etc/cron.d/cronjob_shiftall
RUN npm install -g pdf-bot

WORKDIR /app

RUN npm install

COPY ./deployment-files/pdf-bot.config.js /app/pdf-bot.config.js
ENV DEBUG=pdf:*
CMD ls && cron && pm2 start chromium-browser --interpreter none -- --headless --disable-gpu --disable-translate --disable-extensions --disable-background-networking --safebrowsing-disable-auto-update --disable-sync --metrics-recording-only --disable-default-apps --no-first-run --mute-audio --hide-scrollbars --disable-features=NetworkService --no-sandbox --remote-debugging-port=9222 && pdf-bot -c ./pdf-bot.config.js api

EXPOSE 3000