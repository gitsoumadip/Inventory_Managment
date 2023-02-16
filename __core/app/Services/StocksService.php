<?php

namespace App\Services;

use App\Models\Stocks as SELF_MODEL;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StocksService
{

    // protected $rules = [
    //     'name'                  => 'required|string|max:100|min:2',
    //     'phone'                 =>'required|string|min:10|max:10',
    //     'company_name'          =>'required|string',
    //     'address'               =>'required|string',
    //     'company_phone'         =>'required|string|min:10|max:10',
    //     'company_email'         =>'required|string',
    // ];

    protected $code = 0;
    protected $message;



    function fetch(Request $request, $param = [])
    {
        $this->message = config('custom.MSG_ERROR_TRY_AGAIN');
        $columns_arr = ['id', 'id', 'products_id', 'category_id', 'brand_id', 'store_id', 'models_id','total_qty','sales_qty'];
        // return (new SELF_MODEL)->fetch($request, $columns_arr, $param);
        return (new SELF_MODEL)->fetch($request, $columns_arr, $param);
//
    }

    function getList($params = [])
    {
        $mode = isset($params['mode']) && !empty($params['mode']) ? $params['mode'] : null;
        $columns = [];
        switch ($mode) {
            case 'semi':
                $columns = ['id', 'sub_module_name AS name', 'module_id', 'icon', 'controller_name', 'code'];
                break;
            default:
                $columns = ['id', 'name AS value'];
                break;
        }
        $results = SELF_MODEL::select($columns)->where('status', 1)->get();
        return $results;
    }

    // public function insert(Request $request)
    // {
    //     $this->message = config('custom.MSG_ERROR_TRY_AGAIN');
    //     try {
    //         $validator = Validator::make($request->all(), $this->rules);

    //         if ($validator->fails()) {
    //             $this->message = config('custom.MSG_REQUIRED');
    //         } else {
    //             $insert_array  = $request->except(['_token', '_method', 'id']);

    //             $result = SELF_MODEL::create($insert_array);
    //             if (isset($result) && !empty($result)) {
    //                 $this->code = 1;
    //                 $this->message = config('custom.MSG_RECORD_INSERT_SUCCESS');
    //             } else {
    //                 $this->message = config('custom.MSG_RECORD_INSERT_FAILED');
    //             }
    //         }
    //     } catch (\Throwable $th) {
    //         $this->message = (onProduction()) ?  $this->message : $th->getMessage();
    //     }
    //     return ['code' => $this->code, 'message' => $this->message];
    // }



    // public function get_edit_form($id)
    // {
    //     $this->message = config('custom.MSG_ERROR_TRY_AGAIN');

    //     try {
    //         $data = SELF_MODEL::find($id);

    //         if (isset($data) && !empty($data)) {
    //             $this->code = 1;
    //             $this->message = config('custom.MSG_RECORD_FETCHED_SUCCESS');
    //         } else {
    //             $this->message = config('custom.MSG_RECORD_FETCHED_FAILED');
    //         }
    //     } catch (\Throwable $th) {
    //         $data = [];
    //         $this->message = (onProduction()) ?  $this->message : $th->getMessage();
    //     }
    //     return ['code' => $this->code, 'message' => $this->message, 'data' => $data];
    // }



    // public function update(Request $request, $id)
    // {
    //     $this->message = config('custom.MSG_ERROR_TRY_AGAIN');
    //     $validator = Validator::make($request->all(), $this->rules);
    //     try {
    //         if ($validator->fails() || empty($id)) {
    //             $this->message = config('custom.MSG_REQUIRED');
    //         } else {
    //             $update_array               = $request->except(['_token', '_method', 'id']);
    //             $result = SELF_MODEL::where('id', $id)->update($update_array);

    //             if (isset($result) && !empty($result)) {
    //                 $this->code = 1;
    //                 $this->message = config('custom.MSG_RECORD_UPDATE_SUCCESS');
    //             } else {
    //                 $this->message = config('custom.MSG_RECORD_UPDATE_FAILED');
    //             }
    //         }
    //     } catch (Exception $e) {
    //         $this->message = (onProduction()) ?  $this->message : $e->getMessage();
    //     }
    //     return ['code' => $this->code, 'message' => $this->message];
    // }



    // public function delete($id_arr)
    // {
    //     $this->message = config('custom.MSG_ERROR_TRY_AGAIN');

    //     try {
    //         if (isset($id_arr) && count($id_arr) > 0) {
    //             $result = SELF_MODEL::whereIn('id', $id_arr)->delete();
    //             if (isset($result) && !empty($result)) {
    //                 $this->code = 1;
    //                 $this->message = config('custom.MSG_RECORD_DELETE_SUCCESS');
    //             } else {
    //                 $this->message = config('custom.MSG_RECORD_DELETE_FAILED');
    //             }
    //         }
    //     } catch (Exception $e) {
    //         $this->message = (onProduction()) ?  $this->message : $e->getMessage();
    //     }
    //     return ['code' => $this->code, 'message' => $this->message];
    // }
}
