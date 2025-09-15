<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->string('company_phone')->nullable();
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_phone')->nullable();
            $table->string('client_address')->nullable();
            $table->string('product_name');
            $table->string('product_model')->nullable();
            $table->date('delivery_date')->nullable();
            $table->string('project_title');
            $table->date('start_date')->nullable();
            $table->string('draft_date')->nullable();
            $table->text('project_description')->nullable();
            $table->string('documents')->nullable();
            $table->decimal('project_cost', 12, 2)->nullable();
            $table->boolean('include_tax')->default(false);
            $table->decimal('total', 12, 2)->nullable();
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
