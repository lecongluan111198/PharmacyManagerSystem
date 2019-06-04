<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PrescriptionDetail extends Pivot
{
    public $table = "prescription_details";
    //
    public function medicine(){
        return $this->belongsTo('App\Medicine');
    }
    public function prescription(){
        return $this->belongsTo('App\Prescription');
    }
}
