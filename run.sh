#!/usr/bin/env bash
WORKING_DIR=`pwd`

cd "$WORKING_DIR/frontend"
npm run build

cd "$WORKING_DIR"
vendor/bin/heroku-php-apache2 backend/public/
