<?php

use Illuminate\Http\Request;

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

Route::post('/login', function (Request $request) {
    $credentials = [
        'email' => $request->email,
        'password' => $request->password
    ];

    if (auth()->attempt($credentials)) {
        $token = auth()->user()->createToken('asdasdasd')->accessToken;
        return response()->json(['token' => $token], 200);
    } else {
        return response()->json(['error' => 'UnAuthorised'], 401);
    }
});

Route::get('/token', 'UserController@getToken');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->group(function () {

});
