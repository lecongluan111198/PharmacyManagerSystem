<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', "UserController@login");
Route::post('/reset-password', "UserController@resetPassword");
Route::get("/medicine", "MedicineController@index");
Route::post("/medicine/update/{id}", "MedicineController@update");

Route::middleware('auth:api')->group(function () {
    Route::get("/me", "UserController@showMe");
});
