<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FeatherIcon;
use App\Models\SubModule;
use App\Services\ModuleServices;
use App\Services\SubModuleServices;
use App\Traits\AdminPermission;
use Illuminate\Http\Request;

class SubModuleController extends Controller
{

    use AdminPermission;
    private $results = [];
    private $pageTitle = 'Sub Modules';
    private $currentPage = 'sub-modules';

    private const MODULE_CODE = 'MSM001';

    public function __construct()
    {
        $this->results['module_name'] = $this->currentPage;
        $this->results['module_code'] = self::MODULE_CODE;
    }


    /**
     * Display a listing of the resource.
     *
     * @return view
     */
    public function index()
    {
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_VIEW'), $this->results);
        $this->results['page_title']          = "Manage " . $this->pageTitle;
        $this->results['title_for_layout']    = "Manage " . $this->pageTitle;

        $this->results['modules']                 = (new ModuleServices)->getList();
        $this->results['feather_icons']           = FeatherIcon::all();
        return view('backend.pages.sub-module.index', $this->results);
    }

    /**
     * Return a listing of the resource with limit offset and filter.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_VIEW'), $this->results);
        $result = (new SubModuleServices)->fetch($request);

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
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_ADD'), $this->results);
        return (new SubModuleServices)->insert($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_UPDATE'), $this->results);
        return (new SubModuleServices)->get_edit_form($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_UPDATE'), $this->results);
        return (new SubModuleServices)->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $this->validateAccess(self::MODULE_CODE, config('custom.PERMISSION_DELETE'), $this->results);
        return (new SubModuleServices)->delete(($request->has('delete_array')) ? $request->input('delete_array') : [$id]);
    }
}
