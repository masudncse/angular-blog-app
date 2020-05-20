<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Post;
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
        $posts = Post::paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * @param $category_id
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function postsByCategory($category_id)
    {
        $posts = Post::where('category_id', $category_id)->paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'title' => 'required|max:255',
            'contents' => 'required',
        ]);

        $post = new Post();
        $post->category_id = $request->category_id;
        $post->title = $request->title;
        $post->contents = $request->contents;
        $post->save();

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        $post->category = $post->category;

        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required',
            'title' => 'required|max:255',
            'contents' => 'required',
        ]);

        $post = Post::findOrFail($id);
        $post->category_id = $request->category_id;
        $post->title = $request->title;
        $post->contents = $request->contents;
        $post->update();

        return response()->json($post);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id)->delete();

        return response()->json($post);
    }
}
