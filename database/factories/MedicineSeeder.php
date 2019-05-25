<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Medicine;
use Faker\Generator as Faker;

$factory->define(Medicine::class, function (Faker $faker) {
    return [
        'name' => "Medicine_".$faker->unique()->userName,
        'cost' => random_int(10000, 50000),
        'idCate' => random_int(1, 5),
        'idProvider' => random_int(1, 5),
        'created_at'=>now(),
        'updated_at'=>now(),
    ];
});
