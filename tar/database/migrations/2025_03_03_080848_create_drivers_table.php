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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('UUID')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('license')->nullable();
            $table->string('vehicleColor')->nullable();
            $table->string('carType')->nullable();
            $table->string('liveAddress')->nullable();
            $table->string('carSeat')->nullable();
            $table->string('profileImage')->nullable();
            $table->string('carImage')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
