<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Post;
use App\User;
use Illuminate\Http\Request;

class PostController extends Controller
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

        $create = Post::create([
            'text' => $all['text'],
            'user_id' => $all['user_id'],
            'thread_id' => $all['thread_id']
        ]);
        $post = Post::where('id', $create->id)->with('user')->get();

        if ($create) {
            $returnArray['status'] = true;
            $returnArray['message'] = 'You have posted successfully!';
            $returnArray['post'] = $post;
            return response()->json($returnArray);
        } else {
            $returnArray['message'] = 'Something went wrong.  Please try again later!';
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
        // $returnArray = [];
        $returnArray['status'] = false;


        $posts = Post::where('thread_id', $id)->orderByDesc('created_at')->get();

        foreach ($posts as $post) {
            if ($post->user) {
                User::where('id', $post->user_id)->orderByDesc('created_at')->get();
            }
        }

        $returnArray['status'] = true;
        $returnArray['post'] = $posts;




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