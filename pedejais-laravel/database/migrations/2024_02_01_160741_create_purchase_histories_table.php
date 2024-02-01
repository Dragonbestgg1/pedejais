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
        Schema::create('purchase_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('ticket_id')->nullable();
            $table->unsignedBigInteger('film_id')->nullable()->default(null);
            $table->unsignedBigInteger('activity_id')->nullable()->default(null);
            $table->decimal('price', 8, 2);
            $table->date('date_aired');
            $table->string('payment_status');
            $table->boolean('refunded')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_histories');
    }
};
