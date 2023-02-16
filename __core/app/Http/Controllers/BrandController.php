<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Services\BrandService as SELF_SERVICE;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data['moduleController'] = 'brands';
        $data['categories']=(new CategoryService)->getList();
        return view('backend.pages.brand.index', $data);
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
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$id)
    {
        //
        return (new SELF_SERVICE)->get_edit_form($id);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        //
        return (new SELF_SERVICE)->update($request, $id);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //
        return (new SELF_SERVICE)->delete(($request ->has('delete_array')) ? $request->input('delete_array') : [$id]);

    }
}
