<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];

    public function meetups()
    {
        return $this->hasMany(Category::class);
    }
}