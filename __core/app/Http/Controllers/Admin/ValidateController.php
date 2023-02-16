<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ValidateServices;

class ValidateController extends Controller
{

    public function validateColumns(Request $request)
    {
        return (new ValidateServices)->validateColumns($request);
    }

}
