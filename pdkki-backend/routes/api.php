<?php

use App\Http\Controllers\Api\ConsultantController;
use App\Http\Controllers\Api\StatisticController;
use App\Http\Controllers\Api\DataChangeController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Consultants
    Route::get('/consultants', [ConsultantController::class, 'index']);
    Route::get('/consultants/{id}', [ConsultantController::class, 'show']);

    // Statistics
    Route::get('/statistics', [StatisticController::class, 'index']);
    Route::get('/statistics/provinces', [StatisticController::class, 'byProvince']);
    Route::get('/statistics/gender', [StatisticController::class, 'byGender']);
    Route::post('/data-changes', [DataChangeController::class, 'store']);
});

