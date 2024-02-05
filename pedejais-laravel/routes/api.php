<?php

use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvailableSeatController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\UserControl;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/films', [FilmController::class, "index"]);

Route::post('/films', [FilmController::class, "store"]);

Route::get('/activities', [ActivitiesController::class, "index"]);

Route::post('/activities', [ActivitiesController::class, "store"]);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::put('/users/{id}', [UserController::class, 'update']);

Route::get('/user', [UserControl::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/stage', [AvailableSeatController::class, 'add']);

Route::get('/stage', [AvailableSeatController::class, 'getAll']);