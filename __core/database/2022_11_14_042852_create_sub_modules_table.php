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
        if (!Schema::hasTable('sub_modules')) {
            Schema::create('sub_modules', function (Blueprint $table) {
                // Settings
                $table->engine = 'InnoDB';
                $table->charset = 'utf8mb4';
                $table->collation = 'utf8mb4_unicode_ci';
                // Columns
                $table->id();
                $table->foreignId('module_id')->constrained('modules')->cascadeOnUpdate()->restrictOnDelete();
                $table->string('sub_module_name', 100);
                $table->string('controller_name', 100);
                $table->string('code', 100);
                $table->string('icon', 100)->nullable();
                $table->tinyInteger('sequence')->default(1);

                $table->foreignId('created_by')->constrained('admins')->cascadeOnUpdate()->restrictOnDelete();
                $table->foreignId('updated_by')->nullable()->constrained('admins')->cascadeOnUpdate()->restrictOnDelete();

                $table->tinyInteger('status')->default(1)->index()->comment('0 for Inactive; 1 for Active');
                $table->timestamps();
                $table->softDeletes();
            });

            //Indexes
            Schema::table('sub_modules', function (Blueprint $table) {
                $table->unique(['code', 'deleted_at'], 'code_unique');
                $table->index('created_at');
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
        Schema::dropIfExists('sub_modules');
    }
};
