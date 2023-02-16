<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth, DB, Hash, Bcrypt;
use App\Models\AdminActivity;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth('admin')->user();
        $access_token = $request->session()->token();
        $currentAccessUrl = $request->url();
        if(isset($user) && !empty($user) && isset($access_token) && !empty($access_token)){
            $checkLastActivity = AdminActivity::where(['user_id' => $user->id, 'access_token' => $access_token, 'logged_in' => 1])->first();
            if(isset($checkLastActivity) && !empty($checkLastActivity)){
                if(isset($currentAccessUrl) && !empty($currentAccessUrl) && $currentAccessUrl == config('divya_config.SITE_URL').'DVK-1122'){
                    return redirect(config('divya_config.SITE_URL').'admin/dashboard');    
                }else{
                    return $next($request);
                }
                
            }else{
                return redirect(config('divya_config.SITE_URL').'DVK-1122/'.md5('DVK-1122'));
            }
            // return redirect(config('divya_config.SITE_URL').'DVK-1122/'.md5('DVK-1122'));
        }
        return redirect(config('divya_config.SITE_URL').'DVK-1122/'.md5('DVK-1122'));
    }
}
