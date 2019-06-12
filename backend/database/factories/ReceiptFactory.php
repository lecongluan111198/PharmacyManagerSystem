<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Receipt;
use Faker\Generator as Faker;

$factory->define(Receipt::class, function (Faker $faker) {
    return [
        'cost'=>0,
        'note'=>$faker->paragraph(1),
        'type'=>random_int(0, 1),
    ];
});
