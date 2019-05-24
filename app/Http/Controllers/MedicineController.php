<?php

namespace App\Http\Controllers;

use App\Medicine;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $items = Medicine::paginate(2);
        return response()->json($items);
    }

    public function findID($id){
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
        //
        //return redirect('/api/medicine/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new Medicine();
        //tao id
        $medicine->name = $request->name;
        $medicine->cost = $request->cost;
        $medicine->idCate = $request->idCate;
        $medicine->idProvier = $request->idProvier;
        $medicine->save();
        $ret = [
            'success' => true,
            'message'=> 200,
            'object' => $medicine
        ];
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
    public function edit(Medicine $medicine)
    {
        //
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
        $medicine = Medicine::find($id);
        $medicine->name = $request->name;
        $medicine->cost = $request->cost;
        $medicine->idCate = $request->idCate;
        $medicine->idProvier = $request->idProvier;
        $medicine->save();
        $ret = [
            'success' => true,
            'message'=> 200,
            'object' => $medicine
        ];
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
        $data = Medicine::find($id);
        $data->delete();
        $ret = [
            'success' => true,
            'message'=> 200
        ];
        return response()->json($ret);
    }
}
