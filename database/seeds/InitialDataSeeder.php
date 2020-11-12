<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        
		User::truncate();                		

        /**
         * Пользователи
         */
        // Администратор
        User::forceCreate([
            'role' => User::ROLE_ADMIN,
            'name' => 'Администратор',
            'email' => 'admin@example.com',
            'password' => Hash::make('qwerty'),
        ]);
       	  
        
        Schema::enableForeignKeyConstraints();
    }
	
}
