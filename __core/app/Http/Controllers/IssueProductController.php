<?php

namespace App\Http\Controllers;

use App\Models\issueProduct;
use App\Services\EventService;
use App\Services\IssueService as SELF_SERVICE;
use App\Services\ItemService;
use Illuminate\Http\Request;

class IssueProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data['moduleController'] = 'issueProduct';
        $data['product'] = (new ItemService)->getList([
            'mode' => 'getByProductId'
        ]);
        $data['eventNumber'] = (new EventService)->getList();
        // dd($data);
        return view('backend.pages.issueProduct.index', $data);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\issueProduct  $issueProduct
     * @return \Illuminate\Http\Response
     */
    public function show(issueProduct $issueProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\issueProduct  $issueProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(issueProduct $issueProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\issueProduct  $issueProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, issueProduct $issueProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\issueProduct  $issueProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(issueProduct $issueProduct)
    {
        //
    }
}
