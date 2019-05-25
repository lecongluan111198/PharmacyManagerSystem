<?php

namespace App\Http\Controllers;

use App\Prescription;
use App\Medicine;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Prescription::paginate(20);
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
        $prescription = new Prescription();
        //tao id
        $prescription->name = $request->name;
        $prescription->invoiceDate = $request->invoiceDate;
        $prescription->cost = $request->cost;
        $prescription->idPharma = $request->idPharma;

        $medicines = Medicine::findMany($request->listIds);
        $prescription->medicines()->attach($medicines);
        if ($prescription->save()) {
            $ret = [
                'success' => true,
                'message' => 200,
                'prescription' => $prescription
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request)
    {
        try {
            $prescription = Prescription::findOrFail($request->id);
            $prescription->name = $request->name;
            $prescription->cost = $request->cost;
            $prescription->idCate = $request->idCate;
            $prescription->idProvider = $request->idProvider;
            if ($prescription->save()) {
                $ret = [
                    'success' => true,
                    'message' => 200,
                    'medicine' => $prescription,
                ];
            } else {
                $ret = [
                    'success' => true,
                    'message' => 404,
                    'medicine' => $prescription,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Prescription::findOrFail($id);
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
