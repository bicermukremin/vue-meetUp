<?php

namespace App\Http\Controllers\FrontEnd;

use App\Post;
use App\User;
use App\Meetup;
use App\Thread;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $all = $request->except('token');

        $create = Thread::create([
            'title' => $all['title'],
            'meetup_id' => $all['meetup_id'],
            'user_id' => $all['user_id'],
        ]);

        if ($create) {
            $returnArray['status'] = true;
            $returnArray['message'] = "You created thread successfully";


            return response()->json($returnArray);
        }
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


        $threads = Thread::where('meetup_id', $id)->orderByDesc('created_at')->get();

        foreach ($threads as $thread) {
            if ($thread->posts) {
                Post::where('thread_id', $thread->id)->orderByDesc('created_at')->get();
            }
        }

        $returnArray['status'] = true;
        $returnArray['thread'] = $threads;




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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}