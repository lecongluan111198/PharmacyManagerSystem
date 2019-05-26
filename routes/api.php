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
Route::get("/medicine/{id}", "MedicineController@findID")->where(["id"=>"\\d+"]);
Route::post("/medicine/update", "MedicineController@update");
Route::post("/medicine/delete/{id}", "MedicineController@destroy");
Route::post("/medicine/create", "MedicineController@store");

Route::get('/medicine/findName', "MedicineController@findName");

Route::middleware('auth:api')->group(function () {
    Route::get("/me", "UserController@showMe");
});
