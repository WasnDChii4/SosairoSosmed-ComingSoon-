<?php

use App\Http\Controllers\Api\WelcomeController;
use App\Http\Controllers\UserController;
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
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user/updateProfile', [UserController::class, 'updateProfile']);
    Route::post('/user/updateAvatar', [UserController::class, 'updateAvatar']);

    Route::get('/user/deleteRecentAvatars', [UserController::class, 'deleteRecentAvatars']);
});

Route::middleware('auth:sanctum')->get('/getUserProfile', [UserController::class, 'profile']);

Route::get('/registerSosairo', function (Request $request) {
    return response()->json([
        'message' => 'GET method not allowed for this route. Please use POST.'
    ], 405);
});
Route::post('/registerSosairo', [UserController::class, 'register'])->name('registerSosairo');
Route::get('/loginSosairo', function (Request $request) {
    return response()->json([
        'message' => 'GET method not allowed for this route. Please use POST.'
    ], 405);
});
Route::post('/loginSosairo', [UserController::class, 'login'])->name('loginSosairo');
Route::post('/logoutSosairo', [UserController::class, 'logout'])->name('logoutSosairo');
