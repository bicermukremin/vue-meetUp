<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meetups', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->string('city');
            $table->string('title');
            $table->string('image');
            $table->string('description');
            $table->string('shortInfo');
            $table->unsignedBigInteger('category_id')->index();
            $table->timestamp('startDate');
            $table->string('timeFrom');
            $table->string('timeTo');
            $table->string('status')->default('active');
            $table->integer('joinedPeopleCount')->default(0);
            $table->unsignedBigInteger('meetupCreator')->index();





            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meetups');
    }
}