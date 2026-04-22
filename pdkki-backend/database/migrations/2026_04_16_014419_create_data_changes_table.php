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
        Schema::create('data_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultant_id')->nullable()->constrained('consultants')->onDelete('cascade');
            $table->string('consultant_name');
            $table->string('consultant_number');
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('religion')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('law_firm')->nullable();
            $table->text('law_firm_address')->nullable();
            $table->string('law_firm_province')->nullable();
            $table->string('law_firm_city')->nullable();
            $table->string('law_firm_phone')->nullable();
            $table->text('home_address')->nullable();
            $table->string('home_phone')->nullable();
            $table->string('personal_phone')->nullable();
            $table->string('correspondence_address')->nullable();
            $table->string('correspondence_city')->nullable();
            $table->string('correspondence_province')->nullable();
            $table->string('correspondence_postal_code')->nullable();
            $table->string('correspondence_phone')->nullable();
            $table->string('email')->nullable();
            $table->text('changes_description')->nullable();
            $table->string('face_photo')->nullable();
            $table->string('signature')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_changes');
    }
};
