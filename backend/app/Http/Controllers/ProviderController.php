<?php

namespace App\Http\Controllers;

use App\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort_direction = $request->get("direction", "asc");
        $limit = intval($request->get("limit", 15), 10);

        $search = $request->get("q", "");
        $items = Provider::query()
            ->where("id", "LIKE", "%$search%")
            ->orWhere("name", "LIKE", "%$search%")
            ->paginate($limit);

        return response()->json($items);
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
        $provider = new Provider();
        //tao id
        $provider->name = $request->name;

        $medicines = Medicine::findMany($request->listIds);
        $provider->medicines()->attach($medicines);
        if ($provider->save()) {
            $ret = [
                'success' => true,
                'message' => 200,
                'prescription' => $provider
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
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function show(Provider $provider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $provider =  Provider::findOrFail($id);
        $medicines = $provider->medicines()->get();
        return view('update', [
            'prescription' => $provider,
            'medicines' => $medicines
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $provider = Provider::findOrFail($request->id);
            $provider->name = $request->name;
            if ($provider->save()) {
                $ret = [
                    'success' => true,
                    'message' => 200,
                    'medicine' => $provider,
                ];
            } else {
                $ret = [
                    'success' => true,
                    'message' => 404,
                    'medicine' => $provider,
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
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Provider::findOrFail($id);
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
