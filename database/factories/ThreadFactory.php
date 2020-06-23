<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Thread;
use Faker\Generator as Faker;

$factory->define(Thread::class, function (Faker $faker) {
    return [
        'title' => $faker->realText($maxNbChars = 100, $indexSize = 1),
        'meetup_id' => random_int(1, 20),
        'user_id' => random_int(1, 50),

    ];
});