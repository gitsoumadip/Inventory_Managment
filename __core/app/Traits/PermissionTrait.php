<?php

namespace App\Traits;
use Illuminate\Http\Request;
use DB, Session;

trait PermissionTrait {

public function fetchModulesList() {

}

public function fetchModulesForUser() {

}

public function hasPermission() {

}

public function getPermission() {

}

public function getAccessPermissionByUri(Request $request, String $permissionName) {
    $accessPath                     = ucwords(str_replace("-", " ",$request->segment(2)));
    $accessPermission               = Session::get('useraccess')['records'];
    $permissionArray = [];
    if(count($accessPermission) > 0){
        foreach($accessPermission as $permissionValue){
            if(isset($permissionValue['sub_modules']) && count($permissionValue['sub_modules']) > 0){
                foreach($permissionValue['sub_modules'] as $key => $value){
                    if($value['controller_name'] == $request->segment(2)){
                        $permissionArray = $value;
                    }
                }
            }

        }
    }
    if(isset($permissionArray) && !empty($permissionArray)){
        if(isset($permissionName) && !empty($permissionName)){
            switch($permissionName){
                case "view":
                    return $permissionArray['view_permission'] == 1 ? true : false;
                case "add":
                    return $permissionArray['add_permission'] == 1 ? true : false;
                case "update":
                    return $permissionArray['edit_permission'] == 1 ? true : false;
                case "delete":
                    return $permissionArray['delete_permission'] == 1 ? true : false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }

}


}
