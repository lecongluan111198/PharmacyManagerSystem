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

    public function details() {
        return $this->hasOne("App\ReceiptDetail", "idReceipt", "id")
            ->selectRaw('receipt_details.idReceipt, sum(receipt_details.amount) as value')
            ->groupBy('receipt_details.idReceipt')
            ;
    }
}
