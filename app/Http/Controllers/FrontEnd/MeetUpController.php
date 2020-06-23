<?php

namespace App\Http\Controllers\FrontEnd;

use Auth;
use App\Post;
use App\User;
use App\Meetup;
use App\Thread;
use App\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MeetUpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $returnArray = [];
        $returnArray['status'] = false;
        $search = request()->query('location');
        $research = request()->query('category');

        if ($search && $research) {
            $category = Category::where('name', $research)->first();
            $meetups = Meetup::with('category')->where('category_id', $category->id)->where('location', 'LIKE', "%$search%")->orderByDesc('created_at')->paginate(6);
        } elseif ($search) {
            $meetups = Meetup::with('category')->where('location', 'LIKE', "%$search%")->orderByDesc('created_at')->paginate(6);
        } elseif ($research) {
            $category = Category::where('name', $research)->first();
            $meetups = Meetup::with('category')->where('category_id', $category->id)->orderByDesc('created_at')->paginate(6);
        } else {
            $meetups = Meetup::with('category')->orderByDesc('created_at')->paginate(6);
        }

        $returnArray['status'] = true;
        $returnArray['meetup'] = $meetups;
        return response()->json($returnArray);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $returnArray = [];
        $returnArray['status'] = false;
        $all = $request->except('_token');
        $all['category_id'] = $request->category['id'];
        $all['meetupCreator'] = Auth::user()->id;
        $all['startDate'] = Carbon::parse($request->startDate);
        $all['city'] = $request->location;

        $create = Meetup::create($all);

        $meetup = Meetup::where('id', $create->id)->with('category')->get();

        if ($create) {
            $returnArray['status'] = true;
            $returnArray['message'] = "Meetup Created successfully.";
            $returnArray['meetup'] = $meetup;
        } else {
            $returnArray['message'] = "Meetup can't be created. Pease try again later!";
        }
        return response()->json($returnArray);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $returnArray = [];
        $returnArray['status'] = false;


        $meetup = Meetup::where('id', $id)->with('meetuper')->with('threads')->with('category')->with('users')->get();


        $returnArray['status'] = true;
        $returnArray['meetup'] = $meetup;
        return response()->json($returnArray);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $returnArray = [];
        $returnArray['status'] = false;
        $all = $request->except('token');
        $update = Meetup::where('id', $all['id'])->update([

            "location" => $all['location'],
            "city" => $all['city'],
            "title" => $all['title'],
            "image" => 'https://images.unsplash.com/photo-1592279485490-29d5e35cba3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            "description" =>
            $all['description'],
            "shortInfo" =>
            $all['shortInfo'],
            "category_id"
            => $all['category_id'],
            "startDate"
            => $all['startDate'],
            "timeFrom" =>
            $all['timeFrom'],
            "timeTo" =>
            $all['timeTo'],
            "status" =>
            $all['status'],
            "joinedPeopleCount" =>
            $all['joinedPeopleCount'],
            "meetupCreator" =>
            $all['meetupCreator'],

        ]);
        if ($update) {

            $meetup = Meetup::where('id', $id)->with('meetuper')->with('threads')->with('category')->with('users')->get();


            $returnArray['status'] = true;
            $returnArray['message'] = "Meetup has updated successfully!";
            $returnArray['meetup'] = $meetup;
            return response()->json($returnArray);
        } else {
            $returnArray['status'] = false;
            $returnArray['message'] = "Meetup hasn't updated successfully!";

            return response()->json($returnArray);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $returnArray = [];
        $returnArray['status'] = false;
        $meetup = Meetup::find($id);
        if (Auth::user()->id == $meetup->meetupCreator) {

            $threads = $meetup->threads()->get();
            foreach ($threads as $thread) {
                Post::where('thread_id', $thread->id)->delete();
            }
            Thread::where('meetup_id', $id)->delete();
            Meetup::find($id)->delete();



            $user = User::where('id', Auth::user()->id)->with('meetups')->withCount('meetups')->with('meetups.category')
                ->with('threads')->withCount('threads')
                ->with('posts')->withCount('posts')->get();
            $ownmeetups = Meetup::where('meetupCreator', Auth::user()->id)->with('category')->get();
            $owncount = $ownmeetups->count();
            if ($user) {
                $returnArray['status'] = true;
                $returnArray['user'] = $user;
                $returnArray['ownmeetups'] = $ownmeetups;
                $returnArray['owncount'] = $owncount;
                return response()->json($returnArray);
            }
        }
    }
}