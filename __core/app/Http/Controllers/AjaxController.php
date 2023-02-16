<?php

namespace App\Http\Controllers;

use App\Models\ModelNumber;
use App\Services\BrandService;
use App\Services\ModelNumberService;
use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function index(Request $request)
    {
        $mode = $request->mode;
        $message = config('custom.MSG_ERROR_TRY_AGAIN');
        $result = [];
        $code = 0;
        try {
            switch ($mode) {
                case 'get-brands-by-category':
                    $id = $request->id;
                    $result = (new BrandService)->getList([
                        'mode' => 'getByCategoryId',
                        'id' => $id,
                    ]);
                    $code = 1;
                    $message = config('custom.MSG_RECORD_FETCHED_SUCCESS');
                    break;
                case 'get-model-by-brands':
                    $id = $request->id;
                    $result = (new ModelNumberService())->getList([
                        'mode' => 'getByBrandId',
                        'id' => $id,
                    ]);
                    $code = 1;
                    $message = config('custom.MSG_RECORD_FETCHED_SUCCESS');
                    break;



            }
        } catch (\Exception $e) {
            $message = onProduction() ? $message : $e->getMessage();
        }

        return ["code" => $code, "message" => $message, "result" => $result];
    }
}
