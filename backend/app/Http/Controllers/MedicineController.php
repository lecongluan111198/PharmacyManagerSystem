<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicineCreateRequest;
use App\Http\Resources\MedicineResource;
use App\Medicine;
use App\Category;
use App\Provider;
use App\Receipt;
use App\ReceiptDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

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
            ->paginate(15);

        foreach ($items->items() as $item)
        {
            $amounts = ReceiptDetail::query()
                ->join("medicines", "medicines.id", "=", 'idMedicine')
                ->join("receipts", "receipts.id", "=", "idReceipt")
                ->where("idMedicine", "=", $item->id)
                ->selectRaw("type, sum(amount) as sum_amount")
                ->groupBy("type")
                ->get();

            $res = [
                'import'=>0,
                'export'=>0,
            ];
            foreach ($amounts as $sum) {
                $typename = $sum->type == 0 ? "import" : "export";
                $res[$typename] = intval($sum->sum_amount);
            }
            $item["amount"] = $res["import"] - $res["export"];
        }

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

    public function amount(int $medicine_id) {
        $amounts = ReceiptDetail::query()
            ->join("medicines", "medicines.id", "=", 'idMedicine')
            ->join("receipts", "receipts.id", "=", "idReceipt")
            ->where("idMedicine", "=", $medicine_id)
            ->selectRaw("type, sum(amount) as sum_amount")
            ->groupBy("type")
            ->get();

        $res = [
            'import'=>0,
            'export'=>0,
        ];
        foreach ($amounts as $sum) {
            $typename = $sum->type == 0 ? "import" : "export";
            $res[$typename] = intval($sum->sum_amount);
        }
        $res["total"] = $res["import"] - $res["export"];

        return response()->json($res);
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
     * @param  MedicineCreateRequest $request
     * @return MedicineResource
     */
    public function store(MedicineCreateRequest $request)
    {
        $validated = $request->validated();
        $medicine = Medicine::create($validated);
        $medicine = $medicine->load([
            "provider",
            "category",
        ]);

        return new MedicineResource($medicine);
    }

    /**
     * Display the specified resource.
     *
     * @param  Medicine  $medicine
     * @return MedicineResource
     */
    public function show(Medicine $medicine)
    {
	    $medicine = $medicine->load([
	        'category',
            'provider',
        ]);

	    return new MedicineResource($medicine);
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
     * @param  Medicine $medicine
     * @return MedicineResource
     */
    public function update(Request $request, Medicine $medicine)
    {
        $medicine->update($request->all([
            'name',
            'cost',
            'idCate',
            'idProvider'
        ]));

        return new MedicineResource($medicine);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Medicine  $medicine
     * @return MedicineResource
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
