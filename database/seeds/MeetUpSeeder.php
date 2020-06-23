<?php

use App\Meetup;
use Illuminate\Database\Seeder;

class MeetUpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Meetup::class, 20)->create();
    }
}