<?php

use App\PrescriptionDetail;
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
        $an = App\User::firstOrCreate([
            "email"=>"anaizhu98@gmail.com",
        ], [
            "name"=>"Beo Hoang",
            "email"=>"anaizhu98@gmail.com",
            "password"=>Hash::make("123456"),
        ]);
        $luan = App\User::firstOrCreate([
            "email"=>"lecongluan111198@gmail.com",
        ], [
            "name"=>"Luan Le",
            "email"=>"lecongluan111198@gmail.com",
            "password"=>Hash::make("123456"),
        ]);

        factory(Provider::class, 5)->create();
        factory(Category::class, 5)->create();
        $listMedicine = factory(Medicine::class, 50)->create()->all();

        factory(App\Prescription::class, 50)
            ->create([
                'created_by_id'=>random_int(0, 1) === 0 ? $an->id : $luan->id,
            ])
            ->each(function (App\Prescription $pre) use ($listMedicine) {
                $n = random_int(1, 5);
                $total = 0;
                while ($n-- > 0) {
                    $medicine = $listMedicine[array_rand($listMedicine)];
                    $amount = random_int(1, 3);
                    DB::table("prescription_details")->updateOrInsert([
                        'idPrescription'=>$pre->id,
                    ], [
                        'idPrescription'=>$pre->id,
                        'idMedicine'=> $medicine->id,
                        'amount' => $amount,
                    ]);
                    $total += $amount * $medicine->cost;
                }
                $pre->update([
                    'cost' => $total,
                ]);
            });

        factory(App\Receipt::class, 50)
            ->create()
            ->each(function (App\Receipt $receipt) use ($listMedicine) {
                $n = random_int(1, 5);
                $total = 0;
                while ($n-- > 0) {
                    $medicine = $listMedicine[array_rand($listMedicine)];
                    $amount = random_int(1, 3);
                    DB::table("receipt_details")->updateOrInsert([
                        'idReceipt'=>$receipt->id,
                    ], [
                        'idReceipt'=>$receipt->id,
                        'idMedicine'=> $medicine->id,
                        'amount' => $amount,
                    ]);
                    $total += $amount * $medicine->cost;
                }
                $receipt->update([
                    'cost' => $total,
                ]);
            });
    }
}
