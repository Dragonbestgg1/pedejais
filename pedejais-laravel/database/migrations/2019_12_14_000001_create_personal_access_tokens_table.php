<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('personal_access_tokens', function (Blueprint $table) {
    //         $table->id();
    //         $table->morphs('tokenable');
    //         $table->string('name');
    //         $table->string('token', 64)->unique();
    //         $table->text('abilities')->nullable();
    //         $table->timestamp('last_used_at')->nullable();
    //         $table->timestamp('expires_at')->nullable();
    //         $table->timestamps();
    //     });
    // }
    public function up(): void {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('film_name');
            $table->string('category');
            $table->dateTime('airing');
            $table->time('lenght');
            $table->integer('ticket_id');
            $table->integer('availabe_seats_id');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};
