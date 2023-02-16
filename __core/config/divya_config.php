<?php
return [
    'SITE_URL'              => env('APP_URL'),
    'DB_PREFIX'             => 'dvk_',
    'PROJECT_NAME'          => "Divya Kitchenware",
    'RECORD_COUNT'          => 100,
    'VERSION'               => 2.7,
    'PROJECT_ENV'           => env('APP_ENV'),
    'RELEASE_STATUS'        => 'staging',
    'FROM_EMAIL'            => 'ashok@sundewsolutions.com',
    'GOOGLE_SITE_KEY'       => env('GOOGLE_SITE_KEY'),
    'recaptcha_v3_sitekey'  => env('GOOGLE_SITEKEY_V3'),
    'recaptcha_v3_secret'   => env('GOOGLE_SECRETKEY_V3')
];
