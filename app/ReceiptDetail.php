<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ReceiptDetail extends Pivot
{
    //
    public function medicine(){
        return $this->belongsTo('App\Medicine');
    }
    public function receipt(){
        return $this->belongsTo('App\Receipt');
    }
}
