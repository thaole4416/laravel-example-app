<?php

use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConnectCustomerController;
use App\Http\Controllers\ShopifyCustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/affiliates', [AffiliateController::class, 'index']);
    Route::get('/connect-customer', [ConnectCustomerController::class, 'index']);
    Route::post('/connect-customer', [ConnectCustomerController::class, 'store']);
    Route::delete('/connect-customer/{id}', [ConnectCustomerController::class, 'destroy']);
    Route::get('/shopify-customers', [ShopifyCustomerController::class, 'search']);
});
