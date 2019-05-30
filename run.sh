#!/usr/bin/env bash
WORKING_DIR=`pwd`

cd "$WORKING_DIR/frontend"
npm run build

cd "$WORKING_DIR/backend"
php artisan migrate
php artisan passport:install
php artisan config:cache
php artisan serve
