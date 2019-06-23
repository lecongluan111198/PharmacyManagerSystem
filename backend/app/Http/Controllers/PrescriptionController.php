<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrescriptionCreateRequest;
use App\Prescription;
use App\Medicine;
use App\PrescriptionDetail;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort_direction = $request->get("direction", "desc");
        $sort_key = $request->get("sort", "created_at");
        $start = $request->get("start", $date = date('Y-m-d', strtotime('01/01/1900')));
        $end = $request->get("end", $date = date('Y-m-d', time()));
        $items = Prescription::query()
            ->with('created_by')
            ->with('medicines')
            ->whereDate("created_at", ">=", $start)
            ->whereDate("created_at", "<=", $end)
            ->orderBy($sort_key, $sort_direction)
            ->orderBy("created_by_id", "ASC")
            ->paginate(15);
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
     * @param  PrescriptionCreateRequest  $request
     * @return JsonResource
     */
    public function store(PrescriptionCreateRequest $request)
    {
        $data = $request->validated();
        $cthdList = $data['cthd'];
        $total = array_reduce($cthdList, function ($sum, $item) {
            $medicine = Medicine::findOrFail($item['id']);
            return $sum + $medicine->cost * $item['amount'];
        }, 0);

        $user = auth()->user();
        $prescription = Prescription::create([
            "created_by_id"=>$user->getAuthIdentifier(),
            "invoiceDate"=>date("Y-m-d", time()),
            "cost"=>$total,
        ]);

        foreach ($cthdList as $item) {
            PrescriptionDetail::create([
                "idMedicine"=>$item['id'],
                "idPrescription"=>$prescription->id,
                "amount"=>$item['amount'],
            ]);
        }
        $prescription->load('medicines');

        return new JsonResource($prescription);
    }

    public function addMedicine($id, $medi_id)
    {
        // try {
        //     $prescription = Prescription::findOrFail($id);
        //     $medicines = $prescription->medicines()->attach($medi_id);

        //     if ($prescription->save()) {
        //         $ret = [
        //             'success' => true,
        //             'message' => 200,
        //             'prescription' => $prescription
        //         ];
        //     } else {
        //         $ret = [
        //             'success' => false,
        //             'message' => 404,
        //             'prescription' => null
        //         ];
        //     }
        // } catch (ModelNotFoundException $ex) {
        //     $ret = [
        //         'success' => false,
        //         'message' => $ex->getMessage(),
        //         'medicine' => null
        //     ];
        // }
        // return response()->json($ret);
    }

    /**
     * Display the specified resource.
     *
     * @param  Prescription $prescription
     * @return JsonResource
     */
    public function show(Prescription $prescription)
    {
        $prescription->load([
            'medicines',
            'created_by',
        ]);
        return new JsonResource($prescription);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $prescription =  Prescription::findOrFail($id);
        $medicines = $prescription->medicines()->get();
        return view('update', [
            'prescription' => $prescription,
            'medicines' => $medicines
        ]);
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
            $prescription->invoiceDate = $request->invoiceDate;
            //request nhận đối tượng là [idMedicine, amount]
            // foreach($prescription->medicines as $item){
            //     // if($item->idMedicine )
            // } 
            $prescription->medicines()->detach();
            $prescription->medicines()->attach($request->medicines);
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
            $data->medicines()->detach();
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

    public function removeMedicine($id, $medi_id)
    {
        try {
            $prescription = Prescription::findOrFail($id);
            $medicines = $prescription->medicines()->detach($medi_id);
            
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
        } catch (ModelNotFoundException $ex) {
            $ret = [
                'success' => false,
                'message' => $ex->getMessage(),
                'medicine' => null
            ];
        }
        return response()->json($ret);
    }
}
