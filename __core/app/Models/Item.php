<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Item extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];
    public $appends = ['status_formatted', 'category_formatted', 'product_formatted', 'brand_formatted', 'modelNo_formatted', 'storeLoc_formatted'];


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
// print_r($query);
// die;
           // With filters
            if (isset($search_keyword) && !empty($search_keyword)) {
                $query = $query->where(function ($query) use ($search_keyword) {
                    $query->where('name', 'LIKE', "%{$search_keyword}%")
                        ->orWhere('slug', 'LIKE', "%{$search_keyword}%");
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
    //category
    function getCategoryFormattedAttribute()
    {
        if (isset($this->attributes['category_id']) && !is_null($this->attributes['category_id'])) {
            // $category=Category::select('id')->where('id',$this->attributes['category_id'])->first();
            $category=Category::all();
            return $category;
        } else {
            return null;
        }
    }
    //product
    function getProductFormattedAttribute()
    {
        if (isset($this->attributes['products_id']) && !is_null($this->attributes['products_id'])) {
            $product=Product::select('name')->where('id',$this->attributes['products_id'])->first();
            return $product->name;
        } else {
            return null;
        }
    }
    //brand
    function getBrandFormattedAttribute()
    {
        if (isset($this->attributes['brand_id']) && !is_null($this->attributes['brand_id'])) {
            $brands = Brand::select('name')->where('id',$this->attributes['brand_id'])->first();
            return $brands->name;
        } else {
            return null;
        }
    }
    //model no
    function getModelNoFormattedAttribute()
    {
        if (isset($this->attributes['models_id']) && !is_null($this->attributes['models_id'])) {
            $models=ModelNumber::select('name')->where('id',$this->attributes['models_id'])->first();
            return $models->name;
        } else {
            return null;
        }
    }
    //store loc
    function getStoreLocFormattedAttribute()
    {
        if (isset($this->attributes['store_id']) && !is_null($this->attributes['store_id'])) {
            $store=Store::select('name')->where('id',$this->attributes['store_id'])->first();
            return $store->name;
        } else {
            return null;
        }
    }

}
