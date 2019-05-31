# Simple Pharma

## Install

## BACKEND

```bash
cd backend
composer install
```

## FRONTEND

```bash
cd frontend
npm install
```

## RUN LOCALHOST

1. **copy backend/.env.example thành backend/.env và config lại username và password của mysql**

2. Mở 2 terminal/cmd:

```bash
# for backend
cd backend/
php artisan dev:refresh
php artisan serve
# backend lắng nghe trên port mặc định 8000
```

```bash
# for front end
cd frontend/
npm run serve
# frontend lắng nghe trên port mặc định 8003
```


**Web app được serve trên http://localhost:8003**

