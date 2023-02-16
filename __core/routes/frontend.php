<?php

use App\Http\Controllers\AjaxController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\XssSanitization;

use App\Http\Controllers\frontend\{
    CartController,
    HomeController,
    PageController,
    ProductListingController,
    UserController,
    ProductController,
    ProductWarrantyController,
    CheckoutController,
    OrderController
};


Route::get('/', [HomeController::class, 'homePage'])->name('home_page');
Route::controller(PageController::class)->group(function () {
    Route::get('/checkout-step-1', 'CheckoutFirstStep')->name('checkout_step1');
    Route::get('/checkout-step-2', 'CheckoutSecondStep')->name('checkout_step2');

    Route::get('/my-account', 'MyAccount')->name('my_account');
    Route::get('/order-details', 'orderDetails')->name('order_details');
    Route::get('/about', 'About')->name('about');
    Route::get('/404', 'PageNotFound')->name('page_not_found');
});

// Added By Ashok
Route::group(['middleware' => [XssSanitization::class]], function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('check-unique-value', 'checkUniqueValue');
        Route::post('register', 'createUser');
        Route::post('register-validate-login', 'registerValidateLogin');
        Route::post('resend-otp', 'resendOtp');
        Route::get('logout', 'logout')->name('customer_logout');
        Route::get('auth-google', 'redirectToGoogle')->name('auth.google');
        Route::get('auth/google/callback', 'handleGoogleCallback');
        Route::get('auth-facebook', 'redirectToFacebook')->name('auth.facebook');
        Route::get('auth/facebook/callback', 'handleFacebookCallback');
        Route::post('login', 'handleLogin');
        Route::post('validate-login', 'validateLogin');
        Route::post('forgot-password', 'passwordResetEmail');
        Route::get('reset-password/{code}', 'resetPassword')->name('reset_password');
        Route::post('handle-reset-password', 'handleResetPassword');
    });

    Route::controller(ProductWarrantyController::class)->group(function () {
        Route::get('product-warranty', 'index')->name('product_warranty');
        Route::post('handle-product-warranty', 'handleProductWarranty');
    });

  Route::controller(CheckoutController::class)->group(function () {
    Route::get('checkout', 'checkout')->name('checkout');
    Route::get('payment', 'payment')->name('payment');
    Route::get('order-success', 'orderSuccess')->name('order_success');

    Route::post('handle-checkout', 'handleCheckout');
    Route::post('handle-payment', 'handlePayment');
    Route::post('get-state', 'getState');
    Route::post('get-city', 'getCity');
    Route::post('get-checkout-data', 'getCheckoutData');
  });
});

Route::controller(ProductController::class)->group(function () {
    Route::get('new-arrival', 'newArrival')->name('new_arrival_list');
    Route::get('best-sellers', 'bestSellers')->name('best_sellers_list');
    //   Route::get('listing', 'index')->name('product_listing');
    Route::post('check-product-quantity', 'checkProductQuantity');
    //   Route::get('product/{code}', 'productDetails')->name('product_details');
});

// Added by Pritam
// Get Records by ajax call
Route::post('ajax/get-records', [AjaxController::class, 'index']);
Route::get('{category}/{subcategory}/{code}', [ProductController::class, 'productDetails'])->name('product_details');
Route::get('update-cart', [CartController::class, 'index']);
Route::get('show-cart-items', [CartController::class, 'showCartItems']);
Route::get('cart', [CartController::class, 'cart'])->name('cart');;

Route::get('my-account/orders', [OrderController::class, 'fetch']);
//For Orders
Route::get('order-details/{orderId}', [OrderController::class, 'show']);
Route::put('cancel-order/{orderId}', [OrderController::class, 'cancelOrder']);

// ! THIS HAS TO BE AT THE BOTTOM
// ! ELSE THE PRODUCT LISTING WILL FAIL
Route::get('{slug1?}/{slug2?}', [ProductController::class, 'index'])->name('product_listing');
