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
    Route::get("/employees", "UserController@indexEmployees")->middleware('admin');
    Route::post("/user/create", "UserController@createUser")->middleware('admin');
    Route::post("/user/password-change", "UserController@changePassword");

    Route::apiResource("medicine", "MedicineController");
    Route::get("/medicine/{medicine_id}/amount", "MedicineController@amount");
    Route::get('/medicine/findName', "MedicineController@findName");

    Route::apiResource("/prescription", "PrescriptionController");
    Route::get('/prescription/update', "MedicineController@update");
    Route::apiResource("/receipt", "ReceiptController");
    Route::apiResource("/provider", "ProviderController");
    Route::apiResource("/category", "CategoryController");
});

Route::fallback(function () {
    return response()
        ->json([
            "error"=>404,
            "message"=>"not found this api",
        ], 404);
});
