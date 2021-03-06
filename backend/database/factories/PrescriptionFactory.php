<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Prescription;
use Faker\Generator as Faker;

$factory->define(Prescription::class, function (Faker $faker) {
    $createdAt = $faker->dateTimeThisMonth;
    return [
        "cost"=>0,
        "invoiceDate"=>$createdAt,
    ];
});
