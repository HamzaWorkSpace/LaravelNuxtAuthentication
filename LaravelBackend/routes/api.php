<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Route::get('login',[AuthController::class,'login']);
// Route::get('register',[AuthController::class,'register']);
// Route::get('logout',[AuthController::class,'logout']);

//Route::get('get-message',[Message::class,'getMessageContent']);
//Route::put('edit-SMS',[Message::class,'editSMS']);
//Route::post('delete-Hr-User',[HrUsers::class,'deleteHrUser']);