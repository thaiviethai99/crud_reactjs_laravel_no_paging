<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\News;

class NewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $new = News::where('is_delete',0)->orderBy('id', 'DESC')->paginate(5);
        return response()
            ->json($new);
    }

    public function createTitle(Request $request)
    {
        $result = json_decode($request->getContent());
        News::create(['title'=>$result->title]);
        return response()
            ->json(['message' => 'Success: You have added new']);
    }

    public function delete(Request $request)
    {
        $news = News::find($request->id);
        if (! $news) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $news->is_delete=1;
        $news->save();
        return response()
            ->json(['message' => 'Success: You have deleted the user']);
    }

    public function edit($id)
    {
        $news = News::find($id);
        if (! $news) {
            return response()
            ->json(['error' => 'The user is not exists']);
        }
        return response()
            ->json($news);
    }

    public function update(Request $request)
    {
        $result = json_decode($request->getContent());
        $news = News::find($result->id);
        if (! $news) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $news->update(['title'=>$result->title]);
        return response()
            ->json(['message' => 'Success: You have updated the user']);
    }
}