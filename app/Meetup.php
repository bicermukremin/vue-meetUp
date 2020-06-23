<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meetup extends Model
{
    protected $fillable = ['location', 'city', 'title', 'image', 'description', 'shortInfo', 'category_id', 'startDate', 'timeFrom', 'timeTo', 'joinedPeopleCount', 'status', 'meetupCreator', 'joinedPeople'];

    public function meetuper()
    {
        return $this->belongsTo(User::class, 'meetupCreator');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}