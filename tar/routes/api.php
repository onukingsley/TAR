<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TarPaymentController;
use App\Http\Controllers\UserController;
use App\Models\TarPayment;
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

Route::middleware('auth:sanctum')->get('v1/user', function (Request $request) {
    return response()->json($request->user());
});

Route::group(['prefix'=>'v1',/*'middleware'=>['auth:sanctum']*/],function (){
    Route::apiResource('users',UserController::class);
    Route::apiResource('drivers',DriverController::class);
    Route::apiResource('tarpayments',TarPaymentController::class);
});

Route::post('v1/authenticate',[UserController::class,'authenticate']);
Route::post('v1/stripe',[StripeController::class,'createPaymentIntent']);
Route::post('v1/pay',[StripeController::class,'confirmPayment']);
Route::post('v1/register',[UserController::class,'register']);
Route::post('v1/logout',[UserController::class,'logout'])->middleware('auth:sanctum');
