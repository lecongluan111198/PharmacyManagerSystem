<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    //
    public function precsriptions(){
        return $this->hasMany('App\Prescription');
    }
}
