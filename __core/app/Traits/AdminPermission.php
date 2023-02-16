<?php

namespace App\Traits;

use App\Services\AccessPermissionService;
use Illuminate\Http\Request;
use App\Services\ModuleServices;
use App\Services\SubModuleServices;

trait AdminPermission
{

    protected $code = 0;
    protected $message;

    public function fetchModulesForUser($userID, $userType)
    {
        $results = null;
        if ($userType == 1) {
            $subModules = (new SubModuleServices)->getList(['mode' => 'semi']);
            if (count($subModules) > 0) {
                foreach ($subModules as $rs) {
                    $a = ['view_permission' => 1, 'add_permission' => 1, 'edit_permission' => 1, 'delete_permission' => 1];
                    $permissionsWithSubModules[$rs['id']] = array_merge($a, $rs->toArray());
                }
            }
        } else {
            $permissionsWithSubModules = (new AccessPermissionService)->fetchAssignedPermissionsWithSubModules($userID);
        }
        $masterIds = [];
        if (isset($permissionsWithSubModules) && count($permissionsWithSubModules) > 0) {
            foreach ($permissionsWithSubModules as $pwm) {
                $masterIds[] = $pwm['module_id'];
            }
            $masterIds = array_unique($masterIds);
        }

        if (count($masterIds) > 0) {
            $modulesMaster = (new ModuleServices())->getList(['mode' => 'semi', 'ids' => $masterIds]);
            foreach ($modulesMaster as $master) {
                $masterID = $master['id'];
                $results[$masterID]['master'] = $master->toArray();
            }
            foreach ($permissionsWithSubModules as $pwm) {
                $masterID =  $pwm['module_id'];
                $code =  $pwm['code'];
                $results[$masterID]['sub_modules'][$code]  = $pwm;
            }
        }

        return $results;
    }

    public function validateAccess($moduleCode, $mode = 'all', &$setOnVariable = null)
    {
        // die("here");
        $access = $this->hasAccess($moduleCode);
        if (
            ($mode == 'view' && $access['view_permission'] == 0) ||
            ($mode == 'add' && $access['add_permission'] == 0) ||
            ($mode == 'update' && $access['edit_permission'] == 0) ||
            ($mode == 'delete' && $access['delete_permission'] == 0)
        ) {
            return abort(403);
        }

        foreach ($access as $key => $value) {
            $setOnVariable[$key] = $value;
        }
    }

    public function hasAccess($moduleCode)
    {
        $view = $add = $update = $delete = 0;
        $permissions = session()->get('useraccess');
        $currentModule = [];
        foreach ($permissions as $per) {
            foreach ($per['sub_modules'] as $sub) {
                if (strtoupper($sub['code']) == $moduleCode) {
                    $currentModule = $sub;
                    break;
                }
            }
        }
        if (count($currentModule) > 0) {
            $view = $currentModule['view_permission'];
            $add = $currentModule['add_permission'];
            $update = $currentModule['edit_permission'];
            $delete = $currentModule['delete_permission'];
        }
        $access = ['view_permission' => $view, 'add_permission' => $add, 'edit_permission' => $update, 'delete_permission' => $delete];
        return $access;
    }
}
