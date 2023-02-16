<?php

use Illuminate\Support\Facades\Route;

use App\Http\Middleware\XssSanitization;
use App\Http\Controllers\AjaxController;
use App\Http\Controllers\AppoinmentController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\IssueProductController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ModelNumberController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReturnProductController;
use App\Http\Controllers\StocksController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\SupplierController;

/**
 * Administrations routes start here
 */
Route::group(['prefix' => '/admin', 'as' => 'admin.'], function () {
    /**
     * Common Routes
     */
    // Route for check if existing column exists in database
    Route::post('/check-unique-column', [ValidateController::class, 'validateColumns']);

    Route::group(['middleware' => [XssSanitization::class]], function () {

        // // Route for changing the status
        // Route::put('change-status', [StatusController::class, 'changeStatus'])->name('change-status');

        // // Customers
        // Route::get('customers/fetch', [CustomerController::class, 'fetch'])->name('customers.fetch');
        // Route::resource('customers', CustomerController::class);

        // home Routes
        Route::get('home/fetch', [BrandController::class, 'fetch']);
        Route::resource('home', BrandController::class);

        // Appointment Routes
        Route::get('appointment/fetch', [AppoinmentController::class, 'fetch']);
        Route::resource('appointment', AppoinmentController::class);

        // Event Routes
        Route::get('event/fetch', [EventController::class, 'fetch']);
        Route::resource('event', EventController::class);

        // Category Routes
        Route::get('categories/fetch', [CategoryController::class, 'fetch']);
        Route::resource('categories', CategoryController::class);

        // Brands Routes
        Route::get('brands/fetch', [BrandController::class, 'fetch']);
        Route::resource('brands', BrandController::class);

        // Model No Routes
        Route::get('modelnumber/fetch', [ModelNumberController::class, 'fetch']);
        Route::resource('modelnumber', ModelNumberController::class);

        // Product Routes
        Route::get('product/fetch', [ProductController::class, 'fetch']);
        Route::resource('product', ProductController::class);

        // Suppler Routes
        Route::get('supplier/fetch', [SupplierController::class, 'fetch']);
        Route::resource('supplier', SupplierController::class);

        // Store Routes
        Route::get('store/fetch', [StoreController::class, 'fetch']);
        Route::resource('store', StoreController::class);

        // Items Routes
        Route::get('items/fetch', [ItemController::class, 'fetch']);
        Route::resource('items', ItemController::class);

        // Stocks Routes
        Route::get('stocks/fetch', [StocksController::class, 'fetch']);
        Route::resource('stocks', StocksController::class);

        // Issue Product Routes
        Route::get('issueProduct/fetch', [IssueProductController::class, 'fetch']);
        Route::resource('issueProduct', IssueProductController::class);

        // Return Product Routes
        Route::get('returnProduct/fetch', [ReturnProductController::class, 'fetch']);
        Route::resource('returnProduct', ReturnProductController::class);
    });

});
Route::post('ajax/get-records', [AjaxController::class, 'index']);
// Route::get('ajax/get-records', [AjaxController::class, 'test']);





/**
 * End administrations routes start here
 */
