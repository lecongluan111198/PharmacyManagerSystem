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
        //default 20 element per page
        $sort_direction = $request->get("direction", "asc");
        $sort_key = $request->get("sort", "id");
        $search = $request->get("q", "");

        $items = Medicine::query()
            ->where("id", "LIKE", "%$search%")
            ->orWhere("name", "LIKE", "%$search%")
            ->orderBy($sort_key, $sort_direction)
            ->with('Provider')
            ->with('Category')
            ->paginate(20);
        return response()->json($items);
    }

    public function findID($id)
    {
        $medicine = Medicine::find($id);
        return response()->json([
            'error' => false,
            'data' => $medicine,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('create', [
            'categories' => Category::all(),
            'providers' => Provider::all()
        ]);
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
                'medicine' => $medicine
            ];
        } else {
            $ret = [
                'success' => false,
                'message' => 404,
                'medicine' => null
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
        // $ret = [
        //     'medicine' => Medicine::findOrFail($id),
        //     'categories' => Category::all(),
        //     'providers' => Provider::all()
        // ];

        // return response()->json($ret); 
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
    public function update(Request $request)
    {
        try {
            $medicine = Medicine::findOrFail($request->id);
            $medicine->name = $request->name;
            $medicine->cost = $request->cost;
            $medicine->idCate = $request->idCate;
            $medicine->idProvider = $request->idProvider;
            $medicine->save();
            $ret = [
                'success' => true,
                'message' => 200,
                'medicine' => $medicine,
            ];
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => false,
                'message' => $ex->getMessage(),
                'medicine' => null
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


    public function getPrescription(Request $request, $id)
    {
        try {
            $timeRange = $request->get("time_range");
            $medicine = Medicine::findOrFail($id);
            $prescriptions = $medicine->prescriptions()
                // ->where("invoiceDate", ">=", $timeRange->start)
                // ->where("invoiceDate", "<=", $timeRange->end)
                ->paginate(20);
            $ret = [
                'success' => true,
                'medicine' => $medicine,
                'prescriptions' => $prescriptions
            ];
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => false,
                'message' => $ex->getMessage(),
            ];
        }
        return response()->json($ret);
    }
    public function findName(Request $request)
    {
        $name = $request->query('name', '');
        $limit = intval($request->query('limit', 10));

        $res = Medicine::query()
            ->where("name", "LIKE", "%$name%")
            ->paginate($limit);

        return response()->json($res);
    }
}
