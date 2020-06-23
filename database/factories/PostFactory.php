<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 150, $indexSize = 2),

        'user_id' => random_int(1, 50),
        'thread_id' => random_int(1, 20),
    ];
});