<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->has("count")) {
            $query = $query->withCount("medicines");
        }
        $categories = $query->get();

        return new JsonResource($categories);
    }

    public function getId($id)
    {
        try {
            $category = Category::findOrFaile($id);
            $medicines = $category->medicines()->get();
            $ret = [
                'success' => true,
                'prescription' => $category,
                'medicines' => $medicines
            ];
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => false,
                'message' => $ex->getMessage(),
            ];
        }
        return response()->json($ret);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new Category();
        //tao id
        $category->name = $request->name;

        $medicines = Medicine::findMany($request->listIds);
        $category->medicines()->attach($medicines);
        if ($category->save()) {
            $ret = [
                'success' => true,
                'message' => 200,
                'prescription' => $category
            ];
        } else {
            $ret = [
                'success' => false,
                'message' => 404,
                'prescription' => null
            ];
        }
        return response()->json($ret);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category =  Category::findOrFail($id);
        $medicines = $category->medicines()->get();
        return view('update', [
            'prescription' => $category,
            'medicines' => $medicines
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $category = Category::findOrFail($request->id);
            $category->name = $request->name;
            if ($category->save()) {
                $ret = [
                    'success' => true,
                    'message' => 200,
                    'medicine' => $category,
                ];
            } else {
                $ret = [
                    'success' => true,
                    'message' => 404,
                    'medicine' => $category,
                ];
            }
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => true,
                'message' => $ex->getMessage(),
                'medicine' => null
            ];
        }
        return response()->json($ret);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Category::findOrFail($id);
            $data->delete();
            $ret = [
                'success' => true,
                'message' => 200
            ];
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => false,
                'message' => $ex->getMessage(),
            ];
        }
        return response()->json($ret);
    }
}
