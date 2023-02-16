<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Stocks extends Model
{
    use HasFactory;
    protected $guarded = [];
    // public $appends = ['status_formatted'];

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
            $query = Item::orderBy($sorting_column, $sorting_column == 'id' ? 'desc' : $order[0]['dir']);
            // With filters

            // if (isset($search_keyword) && !empty($search_keyword)) {
            //     $query = $query->where(function ($query) use ($search_keyword) {
            //         $query->where('name', 'LIKE', "%{$search_keyword}%")
            //             ->orWhere('slug', 'LIKE', "%{$search_keyword}%");
            //     });
            // }
            // get values
            $all_count = $query->count();
            $result = $query->select(
                'products_id',
                'category_id',
                'brand_id',
                'models_id',
                DB::raw('SUM(`total_qty`)as totalItem'),
                DB::raw('SUM(`sales_qty`)as outItem'),
                DB::raw('SUM(`total_qty`) -SUM(`sales_qty`)as inItem'),


            )
                ->groupBy('products_id', 'category_id', 'brand_id', 'models_id')
                ->orderBy('products_id', 'asc')
                ->get();
            // $result=$query->select(
            //         'products_id',
            //         'category_id',
            //         'brand_id',
            //         'models_id',
            //         DB::raw('SUM(`item_sale_qty`)as outitem'),
            //         DB::raw('sum(`item_total_qty`)as total')
            //     )->get();

            $status = 1;
            $message = config('custom.MSG_RECORD_FETCHED_SUCCESS');
        } catch (\Exception $e) {
            $message = (onProduction()) ?  $message : $e->getMessage();
        }
        return ['code' => $status, 'message' => $message, 'data' => $result, 'count' => $all_count];
        // return $query;
    }

    // $data['item'] = ItemTbls::with('categories', 'brands', 'products', 'storeloc', 'modelNo')
    // ->select(
    //     'products_id',
    //     'category_id',
    //     'brand_id',
    //     'models_id',
    //     DB::raw('SUM(`item_sale_qty`)as outitem'),
    //     DB::raw('sum(`item_total_qty`)as total')
    // )
    // ->groupBy('products_id', 'category_id', 'brand_id', 'models_id')
    // ->orderBy('products_id', 'asc')
    // ->get();
}
