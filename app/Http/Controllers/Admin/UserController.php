<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Meetup;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function joinMeetup(Request $request)
    {
        $returnArray = [];
        $returnArray['status'] = false;
        $all = $request->except('_token');


        $join = DB::table('meetup_user')->insert([
            'meetup_id' => $all['meetup_id'],
            'user_id' => $all['id']
        ]);

        $meetup = Meetup::where('id', $all['meetup_id'])->firstorFail();
        $count = $meetup->users()->count();
        $meetup->update([
            'joinedPeopleCount' => $count
        ]);

        if ($join) {

            $returnArray['status'] = true;
            $returnArray['message'] = "You are joined the meetup successfully.";
        } else {
            $returnArray['message'] = "Something went wrong. Pease try again later!";
        }
        return response()->json($returnArray);
    }

    public function leaveMeetup(Request $request)
    {
        $returnArray = [];
        $returnArray['status'] = false;
        $all = $request->except('_token');


        $user = User::where('id', $all['id'])->firstOrFail();

        $update = $user->meetups()->detach($all['meetup_id']);
        $meetup = Meetup::where('id', $all['meetup_id'])->firstorFail();
        $count = $meetup->users()->count();
        $meetup->update([
            'joinedPeopleCount' => $count
        ]);



        if ($update) {
            $returnArray['status'] = true;
            $returnArray['message'] = "You are leaved the meetup successfully.";
        } else {
            $returnArray['message'] = "Something went wrong. Pease try again later!";
        }
        return response()->json($returnArray);
    }
    public function userMeetup()
    {
        $returnArray = [];
        $returnArray['status'] = false;



        $user = User::where('id', Auth::user()->id)->with('meetups')->get();

        if ($user) {
            $returnArray['status'] = true;
            $returnArray['userMeetup'] = $user;
        } else {
            $returnArray['message'] = "Something went wrong. Pease try again later!";
        }
        return response()->json($returnArray);
    }
}