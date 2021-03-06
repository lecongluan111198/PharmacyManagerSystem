<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrescriptionCreateRequest;
use App\Http\Requests\PrescriptionUpdateRequest;
use App\Prescription;
use App\Medicine;
use App\PrescriptionDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

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
            ->whereDate("created_at", "<=", $end);

        $items = $items->orderBy($sort_key, $sort_direction)
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

        DB::transaction(function () use ($user, $cthdList, $total) {
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
        });
    }

    public function updateDetail(PrescriptionUpdateRequest $request, $id)
    {
        $validated = $request->validated();

        DB::transaction(function() use ($validated, $id) {
            $cthd = $validated['cthd'];
            foreach ($cthd as $item) {
                $amount = $item['amount'];
                $detail = PrescriptionDetail::where('idMedicine', '=', $item['id'])
                    ->where('idPrescription', '=', $prescription->id)
                    ->first();

                if ($detail) {
                    if ($amount <= 0) {
                        $detail->delete();
                    } else {
                        $detail->amount = $amount;
                        $detail->save();
                    }
                }
            }
        });

        return new JsonResource("Success");
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
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $prescription = \App\Prescription::findOrFail($id);
            $prescription->medicines()->detach();
            $prescription->medicines()->attach($request->post('cthd'));
            if ($prescription->save()) {
                return response()->json(['data'=>$prescription], 200);
            } else {
                return response()->json([
                    'error'=>500,
                    'message'=>'cannot update'
                ], 500);
            }
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'error'=>500,
                'message'=>'Prescription $id not found : '.$ex->getMessage(),
            ], 500);
        }
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
