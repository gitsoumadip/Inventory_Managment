<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupportController;

/**
 * External routes imported
 */
require __DIR__ . '/backend.php';
// require __DIR__ . '/frontend.php';

//support controller
Route::prefix('support', function () {
    Route::get('phpinfo',           [SupportController::class, 'phpinfo']);
    Route::get('db-migrate',        [SupportController::class, 'migrate']);
    Route::get('db-migrate-fresh',  [SupportController::class, 'migrateFresh']);
    Route::get('db-seed',           [SupportController::class, 'seed']);
    Route::get('optimize',          [SupportController::class, 'optimize']);
    Route::get('optimize-clear',    [SupportController::class, 'optimizeClear']);
    Route::get('create-symlink',    [SupportController::class, 'createSymLink']);
    Route::get('token-generate',    [SupportController::class, 'generateToken']);
});
