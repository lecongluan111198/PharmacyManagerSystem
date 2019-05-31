#!/usr/bin/env bash
WORKING_DIR=`pwd`

cd "$WORKING_DIR/frontend"
npm run build

cd "$WORKING_DIR/backend"
php artisan key:generate --show
APP_KEY_WITH_PREFIX=$(php artisan key:generate --show)
export APP_KEY=${APP_KEY_WITH_PREFIX#'base64:'}
echo $APP_KEY
php artisan config:cache

cd "$WORKING_DIR"
vendor/bin/heroku-php-apache2 backend/public/
