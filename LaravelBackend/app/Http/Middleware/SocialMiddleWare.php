<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SocialMiddleWare
{
     /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $services = ['facebook', 'apple', 'google'];
        $enabledServices = [];
        foreach ($services as $service) {
            if (config('services.' . $service)) {
                $enabledServices[] = $service;
            }
        }

        if (!in_array(strtolower($request->service), $enabledServices)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'invalid social service'
                ], 403);
            }
            return redirect()->back();
        }
        //return Auth::onceBasic() ? response()->json(['message'=>'Authentication failed please try again'],401): $next($request);
         return $next($request);
    }
}
