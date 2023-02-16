<?php

namespace App\Traits;

use App\Models\Module;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

trait CommonTrait
{


    public static function check_exists(Request $request, $param)
    {
        // return $param;
        $input_array = $request->input();
        foreach ($input_array as $key => $value) {
            $columns_to_search[] = $key;
        }

        try {
            if ($param == 'Module') {
                $query = Module::query();
                foreach ($input_array as $key => $value) {
                    $query->orWhere($key, $value);
                }
                $result = $query->select($columns_to_search)->distinct()->count();
            } elseif ($param == 'NewsletterSubscription') {
                $query = NewsletterSubscription::query();
                foreach ($input_array as $key => $value) {
                    $query->where($key, $value);
                }
                $result = $query->select($columns_to_search)->distinct()->count();
            } else {
                return "false";
            }
        } catch (\Throwable $th) {
            return "false";
        }

        if ($result == 0) {
            return "true";
        } else {
            return "false";
        }
    }

    /**
     * Delete multiple record from database
     * @param Illuminate\Http\Request $request
     * @return Json true false
     */
    public static function deleteMultipleRecords(Request $request, $table_name)
    {
        // dd($table_name, $request->input());
        $message = config('custom.MSG_ERROR_TRY_AGAIN');
        $code = 0;

        try {
            $delete_arr = $request->delete_array;
            if (isset($delete_arr) && count($delete_arr) > 0) {
                $result = DB::table($table_name)->whereIn('id', $delete_arr)
                    ->update(['deleted_at' => DB::raw('CURRENT_TIMESTAMP')]);
                if (isset($result) && !empty($result)) {
                    $code = 1;
                    $message = config('custom.MSG_RECORD_DELETE_SUCCESS');
                } else {
                    $message = config('custom.MSG_RECORD_DELETE_FAILED');
                }
            }
        } catch (Exception $e) {
            $message = (onProduction()) ?  $message : $e->getMessage();
        }

        return ['code' => $code, 'message' => $message];
    }
    /**
     * Check unique column value from database
     * @param Illuminate\Http\Request $request
     * @return String true false
     */
    public static function checkUniqueColumn(Request $request, $param = []): String
    {
        $modelName  = $request->segment(3);
        $inputData  = $request->all();
        $keyColumn = "";
        $keyValue = "";
        $isEditid = "";
        if (isset($modelName) && !empty($modelName) && count($inputData) > 0) {
            foreach ($inputData as $key => $value) {
                if ($key == "id") {
                    $isEditid = $value;
                }
                if ($key != "id") {
                    $keyColumn = $key;
                    $keyValue = $value;
                }
            }
            if (isset($isEditid) && !empty($isEditid)) {
                if (isset($keyColumn) && !empty($keyColumn) && isset($keyValue) && !empty($keyValue)) {
                    $checkUnique = DB::table($modelName)->where($keyColumn, $keyValue)->whereNull('deleted_at')->where('id', '!=', $isEditid)->count();
                    if ($checkUnique > 0) {
                        return "false";
                    } else {
                        return "true";
                    }
                } else {
                    return "true";
                }
            } else {
                if (isset($keyColumn) && !empty($keyColumn) && isset($keyValue) && !empty($keyValue)) {
                    $checkUnique = DB::table($modelName)->where($keyColumn, $keyValue)->whereNull('deleted_at')->count();
                    if ($checkUnique > 0) {
                        return "false";
                    } else {
                        return "true";
                    }
                } else {
                    return "true";
                }
            }
        } else {
            return "false";
        }
    }

    // change status
    public static function changeStatus(Request $request)
    {
        $message = config('custom.MSG_ERROR_TRY_AGAIN');
        $code = 0;
        try {
            $modelName = $request->model_name;
            $id = $request->id;
            $status = $request->status;
            if (isset($id) && $id > 0) {
                $result = DB::table($modelName)->where('id', $id)->update(['status' => $status]);
                if (isset($result) && !empty($result)) {
                    $code = 1;
                    $message = config('custom.MSG_RECORD_UPDATE_SUCCESS');
                } else {
                    $message = config('custom.MSG_RECORD_UPDATE_FAILED');
                }
            }
        } catch (Exception $e) {
            $message = (onProduction()) ?  $message : $e->getMessage();
        }

        return ['code' => $code, 'message' => $message];
    }
}
