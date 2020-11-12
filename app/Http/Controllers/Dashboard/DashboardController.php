<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\User;
//use Carbon\Carbon;
use DB;

class DashboardController extends Controller
{
    public function index()
    {
		$reg = User::select(DB::raw('count(id) AS cnt, DATE_FORMAT(`created_at`,"%Y") AS day'))
			->orderBy('created_at','ASC')			
			->whereRaw('DATE_SUB(CURDATE(),INTERVAL 50 YEAR) <= `created_at`')
			->groupBy(DB::raw("DATE_FORMAT(`created_at`,'%Y')"))
			->get()
			->toArray();
			
				
        return view('dashboard.index',
		[			
			'users_count'		=> User::where('role','user')->count(),
			'active_menu'		=> 'general',
			'registration'		=> $reg,
			'last'				=> User::select(DB::raw('MAX(created_at) AS last'))->first(),
			'active_menu'		=> 'general'
		]);
    }
}
