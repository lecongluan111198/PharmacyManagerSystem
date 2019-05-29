<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name'=>$faker->unique()->streetName,
        'created_at'=>now(),
        'updated_at'=>now(),
    ];
});
