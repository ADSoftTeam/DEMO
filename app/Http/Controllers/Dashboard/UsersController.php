<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
	use ApiResponses;
	
    public function index()
    {
		if (request()->wantsJson()) {
			$limit = (request()->has('limit')) ? intval(request('limit')) : 10;
			$offset = (request()->has('offset')) ? intval(request('offset')) : 0;
		
			$query = User::where('role', User::ROLE_USER);
            
			// Sorting
			$sortableFields = [
				'id',
				'name',
				'email',
				'created_at'
			];
		
			$total = $query->count();
			
			$users = $query
				->take($limit)
				->skip($offset);
			
			if (request()->has('order') && in_array(request('order'), ['asc', 'desc'])) {
				$order = request('order');
			} else {
				$order = 'asc';
			}
	
			if (request()->has('sort_by') && in_array(request('sort_by'), $sortableFields)) {            
				$users->orderBy(request('sort_by'), $order);
			}
			/*if (request()->has('sort') && in_array(request('sort'),$sortableFields)) {
				$game_item = $game_item->orderby(request('sort'),request('order'));
			}*/
			
			$users = $users->get();		
			
			return json_encode([
				'rows' => $users,
				'total' => $total
			],JSON_UNESCAPED_UNICODE);
		} else {
			return view('dashboard.users.index',['active_menu' => 'users']);
		}
    }
	
	/**
     * Сохранение при добавлении или редактировании
     *
     * @return \Illuminate\Http\Response
     */
    public function store(User $user = null)
    {	
		$rules = [
			'name' => "required|string|max:255|",
			'email' => "required|email|unique:users,email," . ($user ? $user->id : null),			
			'password' => ($user ? 'sometimes' : 'required') . '|string|min:8|confirmed',			
		];
		
		if (request()->ajax()) {
			$data = [];
			$data = request()->except('_token');
			parse_str($data['data'],$params);			
		
			$validator = Validator::make($params, $rules);			
						
			if ($validator->fails()) { 			
				return $this->errorResponse($validator->errors());
			}			
			
			if ($user) {
				// Обновляем
				if (empty($params['password'])) {
					unset($params['password']);
				} else {					
					$params['password'] = Hash::make($params['password']);
				}				
				$user->update($params);				
			} else {
				// Добавляем
				$params['password'] = Hash::make($params['password']);
				$role = User::create($params);				
			}				
			
			//$role->syncPermissions(array_keys($params['permission']),$role->id);
			
			return json_encode('ok',JSON_UNESCAPED_UNICODE);
		}
    }
	
	/**     
     *
     * @return \Illuminate\Http\Response
     */
    public function get_user(User $user)
    {			
		if (request()->ajax()) {			
			
			return json_encode($user,JSON_UNESCAPED_UNICODE);
		}
    }
	
	public function destroy(User $user) {
		if (request()->ajax()) {
									
			$user->delete();			
			return $this->payload('Успешно удален', 201);			
		}
	}
}
