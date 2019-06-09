<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->date('invoiceDate');
            $table->double('cost', 15, 8);

            $table->integer('idPharma')
                ->unsigned()
                ->nullable();

            $table->foreign('idPharma')
                ->references('id')->on('pharmacies')
                ->onDelete('cascade');

            $table->bigInteger('created_by_id')
                ->unsigned()
                ->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
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
        Schema::dropIfExists('prescriptions');
    }
}
