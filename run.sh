#!/usr/bin/env bash
WORKING_DIR=`pwd`

cd "$WORKING_DIR/frontend"
npm run build

cd "$WORKING_DIR/backend"
export APP_KEY = ${$(php artisan key:generate --show)#base64:}
echo $API_KEY

cd "$WORKING_DIR"
vendor/bin/heroku-php-apache2 backend/public/
