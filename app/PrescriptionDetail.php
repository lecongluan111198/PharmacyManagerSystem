<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PrescriptionDetail extends Pivot
{
    //
    public function medicine(){
        return $this->belongsTo('App\Medicine');
    }
    public function precription(){
        return $this->belongsTo('App\Precription');
    }
}
