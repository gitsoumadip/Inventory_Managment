<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\ModelNumber;
use App\Models\Product;
use App\Models\Store;
use App\Services\BrandService;
use App\Services\CategoryService;
use App\Services\ItemService as SELF_SERVICE;
use App\Services\ModelNumberService;
use App\Services\ProductService;
use App\Services\StoreHouseService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['moduleController'] = 'items';
        $data['products'] = (new ProductService)->getList();
        $data['categories'] = (new CategoryService)->getList();
        $data['brands'] = (new BrandService)->getList();
        $data['storeloc'] = (new StoreHouseService)->getList();
        $data['modelNumber'] = (new ModelNumberService)->getList();
        // dd($data);
        return view('backend.pages.items.index', $data);
    }
    /**
     * Return a listing of the resource with limit offset and filter.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $result = (new SELF_SERVICE)->fetch($request);

        return [
            "recordsTotal" => $result['count'],
            "recordsFiltered" => $result['count'],
            "data" =>  $result['data']
        ];
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return (new SELF_SERVICE)->insert($request);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return (new SELF_SERVICE)->get_edit_form($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return (new SELF_SERVICE)->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        return (new SELF_SERVICE)->delete(($request->has('delete_array')) ? $request->input('delete_array') : [$id]);
    }
}
