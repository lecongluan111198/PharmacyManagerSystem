#!/usr/bin/env bash
cd ./backend/
php artisan migrate
php artisan passport:install
php artisan config:cache
php artisan serve
