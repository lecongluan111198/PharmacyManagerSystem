<?php

use Illuminate\Database\Seeder;
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
        factory(Provider::class, 5)->create();
        factory(Category::class, 5)->create();
        factory(Medicine::class, 50)->create();
    }
}
