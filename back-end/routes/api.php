<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\ItemController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [\App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/admin/users', [UserController::class, 'index']);
    Route::get('/admin/users/{user}', [UserController::class, 'show']);
    Route::post('/admin/users', [UserController::class, 'store']);
    Route::patch('/admin/users/{user}', [UserController::class, 'update']);
    Route::delete('/admin/users/{user}', [UserController::class, 'destroy']);

    // Route::resources();
    Route::get('/admin/items', [ItemController::class, 'index']);
    Route::get('/admin/items/{item}', [ItemController::class, 'show']);
    Route::post('/admin/items', [ItemController::class, 'store']);
    Route::patch('/admin/items/{item}', [ItemController::class, 'update']);
    Route::delete('/admin/items/{item}', [ItemController::class, 'destroy']);

});
