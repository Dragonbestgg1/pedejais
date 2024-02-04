<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('film_name');
            $table->string('category');
            $table->dateTime('airing');
            $table->time('lenght');
            $table->integer('availabe_seats_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
