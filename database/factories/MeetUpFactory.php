<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Meetup;
use Faker\Generator as Faker;

$factory->define(Meetup::class, function (Faker $faker) {
    return [
        'location' => $faker->country,
        'city' => $faker->city,
        'title' => $faker->sentence(2),
        'image' => "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        'description' => $faker->sentence(6),
        'shortInfo' => $faker->sentence(6),
        'category_id' => random_int(1, 8),
        'startDate' => $faker->dateTimeInInterval($startDate = 'now', $interval = '+ 7 days', $timezone = null),
        'timeFrom' => $faker->time($format = 'H:i:s', $min = 'now'),
        'timeTo' => '23:59:35',
        'joinedPeopleCount' => '0',
        'status' => 'active',
        'meetupCreator' => random_int(1, 50),


    ];
});