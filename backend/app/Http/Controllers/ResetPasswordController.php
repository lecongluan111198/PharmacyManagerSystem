<?php

namespace App\Http\Controllers;

use App\Notifications\PasswordResetRequest;
use App\ResetPassword;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

// Reference Article
// https://medium.com/modulr/api-rest-with-laravel-5-6-passport-authentication-reset-password-part-4-50d27455dcca

class ResetPasswordController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            "email" => "required|string|email",
        ]);
        $email = $request->post("email", "");
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                "error" => true,
                "message" => "User with email=$email not found",
            ], 404);
        }

        $tokenReset = ResetPassword::updateOrCreate([
            "email" => $email,
        ], [
            "email" => $email,
            "token" => Str::random(42),
        ]);

        if ($tokenReset) {
            $user->notify(new PasswordResetRequest($tokenReset->token));
            return response()->json([
                "error" => false,
                "message" => "We have send you an email to reset your password",
            ], 200);
        } else {
            return response()->json([
                "error" => true,
                "message" => "Cannot create token",
            ], 500);
        }
    }

    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();
        if (!$passwordReset)
            return response()->json([
                'error' => true,
                'message' => 'This password reset token is invalid.'
            ], 404);
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(60)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'error' => true,
                'message' => 'This password reset token is invalid.'
            ], 404);
        }
        return response()->json([
            "error" => false,
            "data" => $passwordReset,
        ]);
    }


    /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ]);
        $passwordReset = ResetPassword::where([
            ['token', $request->get("token", "")],
            ['email', $request->get("email", "")]
        ])->first();

        if (!$passwordReset) {
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        }

        $user = User::where('email', $passwordReset->email)->first();

        if (!$user) {
            return response()->json([
                'message' => "We can't find a user with that e-mail address.",
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));
        return response()->json($user);
    }
}
