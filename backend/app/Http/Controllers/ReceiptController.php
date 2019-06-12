<?php

namespace App\Http\Controllers;

use App\Receipt;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start = $request->get("start", $date = date('Y-M-D', strtotime('01/01/1900')));
        $end = $request->get("end", $date = date('Y-M-D', time()));
        $type = $request->get("type", null);


        $items = Receipt::query()
            ->with(["provider", "medicines"])
            ->whereDate("created_at", ">=", $start)
            ->whereDate("created_at", "<=", $end);

        if ($type != null)
            $items = $items->where('type', '=', $type);

        $items = $items->orderBy("created_at")->paginate(15);

        return response()->json($items);
    }

    public function getId($id)
    {
        try {
            $receipt = Receipt::findOrFaile($id);
            $medicines = $receipt->medicines()->get();
            $ret = [
                'success' => true,
                'prescription' => $receipt,
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
        $receipt = new Receipt();
        //tao id
        $receipt->name = $request->name;
        $receipt->receiptDate = $request->receiptDate;
        $receipt->cost = $request->cost;
        $receipt->note = $request->note;
        $receipt->type = $request->type;

        $medicines = Medicine::findMany($request->listIds);
        $receipt->medicines()->attach($medicines);
        if ($receipt->save()) {
            $ret = [
                'success' => true,
                'message' => 200,
                'prescription' => $receipt
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
     * @param  \App\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function show(Receipt $receipt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $receipt =  Receipt::findOrFail($id);
        $medicines = $receipt->medicines()->get();
        return view('update', [
            'prescription' => $receipt,
            'medicines' => $medicines
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $receipt = Receipt::findOrFail($request->id);
            $receipt->name = $request->name;
            $receipt->receiptDate = $request->receiptDate;
            $receipt->cost = $request->cost;
            $receipt->note = $request->note;
            $receipt->type = $request->type;
            if ($receipt->save()) {
                $ret = [
                    'success' => true,
                    'message' => 200,
                    'medicine' => $receipt,
                ];
            } else {
                $ret = [
                    'success' => true,
                    'message' => 404,
                    'medicine' => $receipt,
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
     * @param  \App\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = Receipt::findOrFail($id);
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
            $receipt = Receipt::findOrFail($id);
            $medicines = $receipt->medicines()->detach($medi_id);
            
            if ($receipt->save()) {
                $ret = [
                    'success' => true,
                    'message' => 200,
                    'prescription' => $receipt
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
