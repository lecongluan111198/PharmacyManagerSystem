<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrescriptionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prescription_details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idMedicine')->unsigned();
            $table->integer('idPrescription')->unsigned();
            $table->integer('amount');
            $table->foreign('idMedicine')
                ->references('id')->on('medicines')
                ->onDelete('cascade');
            $table->foreign('idPrescription')
                ->references('id')->on('prescriptions')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prescription_details');
    }
}
