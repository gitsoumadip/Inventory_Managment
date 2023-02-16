<?php

namespace App\Http\Controllers;

use App\Models\ModelNumber;
use App\Services\BrandService;
use App\Services\ModelNumberService as SELF_SERVICE;
use Illuminate\Http\Request;

class ModelNumberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['moduleController'] = 'modelnumber';
        $data['brands']=(new BrandService)->getList();
        return view('backend.pages.modelNumber.index', $data);

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
     * @param  \App\Models\ModelNumber  $modelNumber
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ModelNumber  $modelNumber
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$id)
    {
        return (new SELF_SERVICE)->get_edit_form($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ModelNumber  $modelNumber
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return (new SELF_SERVICE)->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ModelNumber  $modelNumber
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        return (new SELF_SERVICE)->delete(($request->has('delete_array')) ? $request->input('delete_array') : [$id]);
    }
}
