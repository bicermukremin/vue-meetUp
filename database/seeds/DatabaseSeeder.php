<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategorySeeder::class);
        $this->call(MeetUpSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(ThreadSeeder::class);
        $this->call(PostSeeder::class);
    }
}