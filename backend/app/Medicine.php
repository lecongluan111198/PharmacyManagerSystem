<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $attributes = ['total'];
    //
    public function category(){
        return $this->belongsTo('App\Category', 'idCate', 'id', 'category');
    }
    public function provider(){
        return $this->belongsTo('App\Provider', 'idProvider', 'id', 'provider');
    }
    public function prescriptions()
    {
        return $this->belongsToMany('App\Prescription', 'prescription_details','idMedicine','idPrescription');
    }
    public function receipts()
    {
        return $this->belongsToMany('App\Receipt',  'receipt_details','idMedicine','idReceipt');
    }

    public function total()
    {
        return $this->hasMany('App\ReceiptDetail', 'idMedicine', 'id')
            ->selectRaw('receipt_details.idMedicine, sum(receipt_details.amount) as aggregate')
            ->groupBy('receipt_details.idMedicine');
    }

    public function getTotalAttributes()
    {
        // if relation is not loaded already, let's do it first
        if ( ! array_key_exists('total', $this->relations))
            $this->load('total');

        $related = $this->getRelation('total')->first();

        // then return the count directly
        return ($related) ? (int) $related->aggregate : 0;
    }
}
