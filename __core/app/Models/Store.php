<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Store extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    public $appends = ['status_formatted'];

    public function fetch(Request $request, $columns_arr, $param = [])
    {
        $result             = [];
        $status             = 0;
        $all_count          = 0;
        $message            = config('custom.MSG_ERROR_TRY_AGAIN');
        try {
            // fetching all data for datatable
            $start              = $request->start;
            $length             = $request->length;
            $order              = $request->order;
            $sorting_column     = $columns_arr[$order[0]['column']];
            $search_keyword     = $request->search_keyword ? trim($request->search_keyword) : '';
            // common query
            $query = Store::orderBy($sorting_column, $sorting_column == 'id' ? 'desc' : $order[0]['dir']);
            // With filters

            if (isset($search_keyword) && !empty($search_keyword)) {
                $query = $query->where(function ($query) use ($search_keyword) {
                    $query->where('name', 'LIKE', "%{$search_keyword}%");
                });
            }
            // get values
            $all_count = $query->count();
            $result = $query->limit($length)->offset($start)->get();

            $status = 1;
            $message = config('custom.MSG_RECORD_FETCHED_SUCCESS');
        } catch (\Exception $e) {
            $message = (onProduction()) ?  $message : $e->getMessage();
        }
        return ['code' => $status, 'message' => $message, 'data' => $result, 'count' => $all_count];
    }

    // Accessors here
    function getStatusFormattedAttribute()
    {
        if (isset($this->attributes['status']) && !is_null($this->attributes['status'])) {
            switch ($this->attributes['status']) {
                case 1:
                    return "Active";
                    break;

                default:
                    return "Inactive";
                    break;
            }
        } else {
            return null;
        }
    }

    // function storeLoc()
    // {
    //     return $this->belongsTo(Item::class, 'store_id');
    // }
}
