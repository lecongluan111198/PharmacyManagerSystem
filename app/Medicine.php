<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
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
}
