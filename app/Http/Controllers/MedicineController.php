<?php

namespace App\Http\Controllers;

use App\Medicine;
use App\Category;
use App\Provider;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //default 10 element per page
        $items = Medicine::paginate(10);
        return response()->json($items);
    }

    public function findID($id)
    {
        $medicine = Medicine::find($id);
        return response()->json($medicine);
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
        $medicine = new Medicine();
        //tao id
        $medicine->name = $request->name;
        $medicine->cost = $request->cost;
        $medicine->idCate = $request->idCate;
        $medicine->idProvider = $request->idProvider;
        if ($medicine->save()) {
            $ret = [
                'success' => true,
                'message' => 200,
                'object' => $medicine
            ];
        } else {
            $ret = [
                'success' => false,
                'message' => 404,
                'object' => null
            ];
        }
        return response()->json($ret);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function show(Medicine $medicine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('update', [
            'medicine' => Medicine::findOrFail($id),
            'categories' => Category::all(),
            'providers' => Provider::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $medicine = Medicine::findOrFail($id);
            $medicine->name = $request->name;
            $medicine->cost = $request->cost;
            $medicine->idCate = $request->idCate;
            $medicine->idProvider = $request->idProvider;
            $medicine->save();
            $ret = [
                'success' => true,
                'message' => 200,
                'object' => $medicine,
            ];
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => true,
                'message' => $ex->getMessage(),
                'object' => null
            ];
        }
        return response()->json($ret);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Medicine::findOrFail($id);
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
