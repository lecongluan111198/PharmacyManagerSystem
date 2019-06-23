<?php

namespace App\Http\Middleware;

use Closure;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user();
        if ($user->role == 0) {
            return $next($request);
        }
        return response()->json([
            'error'=>403,
            'message'=>'You are not admin',
        ], 403);
    }
}
