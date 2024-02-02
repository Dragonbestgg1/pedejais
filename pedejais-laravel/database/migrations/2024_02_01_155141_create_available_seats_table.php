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
        Schema::create('available_seats', function (Blueprint $table) {
            $table->id();
            $table->integer('max_seats');
            $table->integer('available_seats');
            $table->integer('taken_seats');
            $table->string('stage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('available_seats');
    }
};