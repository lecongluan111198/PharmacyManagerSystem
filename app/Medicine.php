<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    //
    public function category(){
        return $this->belongsTo('App\Category');
    }
    public function provider(){
        return $this->belongsTo('App\Provider');
    }
    public function prescriptions()
    {
        return $this->belongsToMany('App\Prescription')->using('App\PrescriptionDetail');
    }
}
