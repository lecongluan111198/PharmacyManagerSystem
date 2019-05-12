# PROJECT STRUCTURE

## Table of Contents
1. [Backend](#1-backend)
    
    1.1 [Controller](#11-controller)
    
    1.2 [Models](#12-models)

2. [Frontend](#2-frontend)

    2.1. [Views](#21-views)
    
    2.2. [Components](#22-components)
    
    2.3. [Vuex](#23-vuex-state-management)
    
    2.4. [API Class](#24-api-class)

## 1 - Backend

All files except folder `frontend`

**Run backend**
```bash
composer install

php artisan serve
```

### Structure
#### 1.1 Controller
- path: `app/Http/Controller`
    - `Controller.php`: Laravel Controller models
    - `SpaController.php`: Controller to serve frontend
    - `StoreController.php`: Controller to handle API for `Store` model
#### 1.2 Models
- path: `app/`
    - `User.php`: Laravel User model, include handle Auth & Token
    - `Store.php`: Store model

## 2 - Frontend

Folder `frontend`.

Using [Vue CLI 3](https://cli.vuejs.org/) to build & serve.

Using [Vuejs](https://vuejs.org/) to render `frontend`.

**Run frontend**
```bash
cd frontend # go to folder frontend

# then
npm install # or yarn install

npm run serve # or yarn serve
```

### 2.1 Views

**path:** `frontend/src/views/`

Contains Main Views of Website

### 2.2 Components

**path**: `frontend/src/components/`

Contains Vue reusable, independent components for views

### 2.3 Vuex (State Management)

**path**: `frontend/src/store/`

Contains Vuex store for handle state of Vue app

### 2.4 API Class

**path**: `frontend/src/api/`

Contains class for handling API class with `Axios`, for get/post data through `Backend` & `Frontend`. Api call url start with `/api/....`
