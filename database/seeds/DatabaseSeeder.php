<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Hash;
use App\Provider;
use App\Category;
use App\Medicine;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            "name"=>"Beo Hoang",
            "email"=>"anaizhu98@gmail.com",
            "password"=>Hash::make("123456"),
        ]);
        DB::table("users")->insert([
            "name"=>"Luan Le",
            "email"=>"lecongluan111198@gmail.com",
            "password"=>Hash::make("123456"),
        ]);

        factory(Provider::class, 5)->create();
        factory(Category::class, 5)->create();
        factory(Medicine::class, 50)->create();
    }
}
