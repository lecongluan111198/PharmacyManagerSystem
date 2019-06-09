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


Route::middleware('auth:api')->group(function () {
    Route::get("/me", "UserController@showMe");

    Route::apiResource("/medicine", "MedicineController");
    Route::apiResource("/prescription", "PrescriptionController");
    Route::apiResource("/receipt", "ReceiptController");
    Route::apiResource("/provider", "ProviderController");
    Route::get('/medicine/findName', "MedicineController@findName");
});
