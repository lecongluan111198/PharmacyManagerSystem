<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Provider;
use Faker\Generator as Faker;

$factory->define(Provider::class, function (Faker $faker) {
    return [
        'name'=> 'Provider_'.$faker->unique()->streetName,
        'phoneContact'=> $faker->unique()->phoneNumber,
        'address'=> $faker->address,
        'created_at'=>now(),
        'updated_at'=>now(),
    ];
});
