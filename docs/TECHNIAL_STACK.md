# Table of Contents

1. [Backend](#1-backend)
2. [Frontend](#2-frontend)

## 1. BACKEND

**Framework**: [Laravel](https://laravel.com/)

Why **Laravel**:

+ ORM Class binding ([Eloquent](https://laravel.com/docs/5.8/eloquent))
+ Database Helper:
    * Multi builder for `MySQL`, `SQL Server`, `SQLite`, `PostgreSQL`
    * Migration
    * Seeding (for create test data)
    
+ Authentication
    * Auth by **Session**
    * Auth by **Token** with [Passport](https://laravel.com/docs/5.8/passport)

+ Define Route easier with MVC Pattern
    * Web route (not use)
    * API route

## 2. FRONTEND

**Framework**: [Vuejs](https://vuejs.org/)

**UI Library**: [MuseUI](https://muse-ui.org/#/en-US)

**Why Vue**:
- Render Component each views easier
- Put data to views easier
- Reusable Components
- Fast design because using **MuseUI**

**State management for Vue**: [Vuex](https://vuex.vuejs.org/)

- Map data and attributes to Vue Components
- All Components will use 1 state, data or state of each component will be updated together
- Declare function to handle API once & reuse it. No need to write again.
