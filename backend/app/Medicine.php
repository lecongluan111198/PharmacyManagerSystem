<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Medicine extends Model
{
    protected $fillable = [
        "name",
        "cost",
        "idCate",
        "idProvider",
    ];
    //
    public function category() {
        return $this->belongsTo('App\Category', 'idCate', 'id');
    }
    public function provider() {
        return $this->belongsTo('App\Provider', 'idProvider', 'id');
    }
    public function prescriptions()
    {
        return $this->belongsToMany('App\Prescription', 'prescription_details','idMedicine','idPrescription');
    }
}
