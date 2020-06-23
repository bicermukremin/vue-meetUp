<?php

namespace App\Http\Controllers\FrontEnd;

use App\Meetup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    public function search()
    {

        if ($search = \Request::get('q')) {
            $meetups = Meetup::with('category')->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', "%$search%")
                    ->orWhere('location', 'LIKE', "%$search%")
                    ->orWhere('city', 'LIKE', "%$search%");

                $query->orWhereHas('category', function ($q) use ($search) {
                    $q->where(function ($q) use ($search) {
                        $q->where('name', 'LIKE', '%' . $search . '%');
                    });
                });
            })->orderByDesc('created_at')->paginate(4);
        } else {
            $meetups = Meetup::latest()->paginate(2);
        }

        return $meetups;
    }
    public function searchCategory()
    {

        if ($search = \Request::get('q')) {
            $meetups = Meetup::with('category')->where(function ($query) use ($search) {

                $query->orWhereHas('category', function ($q) use ($search) {

                    $q->where('name', 'LIKE', '%' . $search . '%');
                });
            })->orderByDesc('created_at')->paginate(4);
        } else {
            $meetups = Meetup::latest()->paginate(2);
        }

        return $meetups;
    }
}