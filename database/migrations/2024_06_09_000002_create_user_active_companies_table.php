<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserActiveCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('user_active_companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('company_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            // $table->unique('user_id'); // Remove this line to allow multiple active companies per user
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_active_companies');
    }
}
