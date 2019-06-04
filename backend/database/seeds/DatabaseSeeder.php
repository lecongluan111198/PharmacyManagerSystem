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
        $an = App\User::create([
            "name"=>"Beo Hoang",
            "email"=>"anaizhu98@gmail.com",
            "password"=>Hash::make("123456"),
        ]);
        $luan = App\User::create([
            "name"=>"Luan Le",
            "email"=>"lecongluan111198@gmail.com",
            "password"=>Hash::make("123456"),
        ]);

        factory(Provider::class, 5)->create();
        factory(Category::class, 5)->create();
        $listMedicine = factory(Medicine::class, 50)->create()->all();

        factory(App\Prescription::class, 50)
            ->create([
                'created_by'=>random_int(0, 1) === 0 ? $an->id : $luan->id,
            ])
            ->each(function ($pre) use ($listMedicine) {
                App\PrescriptionDetail::create([
                    'idPrescription'=>$pre->id,
                    'idMedicine'=>$listMedicine[array_rand($listMedicine)]->id,

                ]);
            });
    }
}
