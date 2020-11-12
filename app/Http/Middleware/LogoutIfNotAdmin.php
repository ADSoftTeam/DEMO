<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Illuminate\Support\Facades\Auth;

class LogoutIfNotAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!auth()->check() || auth()->user()->role != User::ROLE_ADMIN) {            
			
			if (auth()->user()->role == User::ROLE_USER) {
				Auth::logout();
				return redirect()->back()->with('message','Вход только для Админа!');
				
			}
			Auth::logout();
			return redirect()->route('dashboard');			
            
        }

        return $next($request);
    }
}
