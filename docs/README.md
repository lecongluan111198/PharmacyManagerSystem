# PROJECT DOCUMENTS

## HOW TO RUN IN LOCALHOST

### 1. Backend dependencies

1.1. Install `php 7`

```
php --version

PHP 7.2.17-0ubuntu0.18.04.1 (cli) (built: Apr 18 2019 14:12:38) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.17-0ubuntu0.18.04.1, Copyright (c) 1999-2018, by Zend Technologies
    with Xdebug v2.6.0, Copyright (c) 2002-2018, by Derick Rethans
```

1.2. Install `composer` 

```
composer --version

Composer 1.6.3 2018-01-31 16:28:17
```

1.3. Install dependencies
```bash
composer install
```

### 2. Frontend dependencies

2.0 Go into **frontend** folder
```bash
cd frontend
```

2.1 `Node` & `npm`

```bash
node --version
v8.10.0

npm --version
3.5.2
```

2.2 Install dependencies

```bash
npm install
```

### 3. Run

You need open 2 terminal / cmd

#### Terminal / cmd for `frontend`
- Start local serve at `http://localhost:8003`
    ```bash
    npm run serve
    ```

#### Terminal / cmd for `backend`
- Config `.env` first (Copy from `.env.example`), put *Database credential* to your `.env` file
- Migrate database if first start
    ```bash
    php artisan db:migrate
    ```
- Start local server at `http://localhost:8000`
    ```bash
    php artisan serve
    ```

Then, goto `http://localhost:8003` for preview website


## OTHER DOCUMENT
- [HOW THIS APP WORK](HOW_APP_WORK.md)
- [PROJECT STRUCTURE](PROJECT_STRUCTURE.md)
- [TECHNICAL STACK](TECHNIAL_STACK.md)
- [VUE COMPONENTS DOCS](VUE_COMPONENTS.md)
