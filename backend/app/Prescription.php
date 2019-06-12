<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $fillable = [
        'created_by_id',
        'invoiceDate',
        'cost',
    ];
    //
    public function pharmacy(){
        return $this->belongsTo('App\Pharmacy');
    }
    public function medicines()
    {
        //return $this->belongsToMany('App\Medicine')->using('App\PrescriptionDetail');
        return $this->belongsToMany('App\Medicine', 'prescription_details', 'idPrescription','idMedicine')
            ->withPivot([
                'amount',
            ])->as('amount');
    }

    public function created_by() {
        return $this->belongsTo('App\User', 'created_by_id');
    }
}
