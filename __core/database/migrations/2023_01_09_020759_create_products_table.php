<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('category_id')->constrained('categories')->cascadeOnUpdate()->restrictOnDelete();
            // $table->foreignId('brand_id')->constrained('brands')->cascadeOnUpdate()->restrictOnDelete();
            // $table->foreignId('modelNumber_id')->constrained('model_numbers')->cascadeOnUpdate()->restrictOnDelete();
            $table->string('name',200);
            $table->string('slug',200);
            $table->text('description')->nullable();
            $table->tinyInteger('status')->default(1)->comment('1->active & 0->inactive');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
