#!/bin/bash
REPOSITORY=https://github.com/jjjvdberg/CoffeeApp.git
GIT_DIR=/var/www/coffeeapp
SCREEN_SESSION=nodejs_session
SERVER_INIT=server/index.js
cd $GIT_DIR
git pull $REPOSITORY | grep "up-to-date"
UPDATE_TO_DATE=$?
if [ "$UP_TO_DATE" = "1" ]; then
 screen -S $SCREEN_SESSION -X quit
 screen -U -S $SCREEN_SESSION sudo nodejs $SERVER_INIT
else
 echo up to date
fi
