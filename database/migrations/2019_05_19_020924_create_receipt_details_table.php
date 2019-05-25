<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReceiptDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receipt_details', function (Blueprint $table) {
//            $table->increments('id');
            $table->integer('idMedicine')->unsigned();
            $table->integer('idReceipt')->unsigned();

            $table->primary([
                'idMedicine',
                'idReceipt',
            ]);

            $table->foreign('idMedicine')
                    ->references('id')->on('medicines')
                    ->onDelete('cascade');
            $table->foreign('idReceipt')
                    ->references('id')->on('receipts')
                    ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return voidigrate
     */
    public function down()
    {
        Schema::dropIfExists('receipt_details');
    }
}
