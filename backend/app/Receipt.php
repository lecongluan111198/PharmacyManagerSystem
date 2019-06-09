<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    //
    public function provider()
    {
        return $this->belongsTo("App\Provider", "provider_id");
    }

    public function medicines()
    {
        return $this->belongsToMany('App\Medicine','receipt_details', 'idReceipt', 'idMedicine');
    }
}
