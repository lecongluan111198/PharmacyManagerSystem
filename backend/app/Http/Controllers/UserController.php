<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

    public function update(Request $request) {
        $user = auth()->user();
    }

    public function indexEmployees() {
        return new JsonResource(User::where('role', ">", 0)->get());
    }

    public function createUser(CreateUserRequest $request) {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return new JsonResource($user);
    }

    public function changePassword(Request $request) {
        $data = $request->validate([
            'old_password' => 'required|string|min:1',
            'new_password' => 'required|string|min:6',
        ]);
        $user = auth()->user();

        if (Hash::check($data['old_password'], $user->password)) {
            $user->update([
                'password'=>Hash::make($data['new_password']),
            ]);
            return new JsonResponse($user);
        } else {
            return response()->json([
                'error'=>400,
                'message'=>"Old password is wrong",
            ], 400);
        }
    }
}
