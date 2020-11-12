<?php

Route::get('/', 'DashboardController@index')->name('dashboard');

// Users - Back-end
Route::get('/users', 'UsersController@index')->name('dashboard.users');
Route::post('/users', 'UsersController@store')->name('dashboard.users.create');
Route::post('/users/{user}', 'UsersController@store')->name('dashboard.users.update');
Route::get('/users/{user}', 'UsersController@get_user')->name('dashboard.users.get');
Route::delete('/users/{user}', 'UsersController@destroy')->name('dashboard.users.delete');