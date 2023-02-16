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
        if (!Schema::hasTable('model_numbers')) {
            Schema::create('model_numbers', function (Blueprint $table) {
                $table->id();
                // $table->foreignId('brand_id')->constrained('brands')->cascadeOnUpdate()->restrictOnDelete();
                $table->string('name', 200);
                $table->string('slug', 200)->nullable();
                $table->tinyInteger('status')->default(1)->comment('1->active & 0->inactive');
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('model_numbers');
    }
};
