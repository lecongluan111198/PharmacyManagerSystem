<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->double('cost', 15, 8);
            $table->integer('idCate')->unsigned()->nullable();
            $table->integer('idProvider')->unsigned()->nullable();
            $table->foreign('idCate')
                ->references('id')->on('categories')
                ->onDelete('set null');
            $table->foreign('idProvider')
                ->references('id')->on('providers')
                ->onDelete('set null');
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
        Schema::dropIfExists('medicines');
    }
}
