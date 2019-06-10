<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Medicine extends Model
{
//    protected $attributes = ['total'];
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
}
