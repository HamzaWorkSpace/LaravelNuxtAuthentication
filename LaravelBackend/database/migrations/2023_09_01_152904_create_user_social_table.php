<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_social', function (Blueprint $table) {
            $table->increments('id');

            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'id'
            )->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->string('social_id')->nullable();
            $table->string('service');
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_social');
    }
};
