<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    //
    public function pharmacy(){
        return $this->belongsTo('App\Pharmacy');
    }
    public function medicines()
    {
        return $this->belongsToMany('App\Medicine')->using('App\PrescriptionDetail');
    }
}
