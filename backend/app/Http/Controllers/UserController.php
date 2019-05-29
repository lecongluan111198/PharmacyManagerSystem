<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('SimplePharma')->accessToken;
            return response()->json([
                'error' => false,
                'data' => $token
            ], 200);
        } else {
            return response()->json(['error' => 'UnAuthorised'], 401);
        }
    }

    public function showMe()
    {
        $user = auth()->user();
        return response()->json([
            "error" => false,
            "data" => $user,
        ]);
    }
}
