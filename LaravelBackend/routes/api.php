<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocialAuthController;


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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('/AuthProvider', [SocialAuthController::class, 'assignAuthProvider']);

Route::get('/auth/redirect', [SocialAuthController::class, 'SocialAuthRedirect']);
Route::get('/auth/callback', [SocialAuthController::class, 'SocialAuthCallBack']);