<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consultants', function (Blueprint $table) {
            $table->id();

            // Data Pribadi
            $table->string('name');
            $table->string('consultant_id')->unique();
            $table->date('registered_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->string('religion')->nullable();
            $table->string('id_number')->nullable();         

            // Kantor / Firma Hukum
            $table->string('law_firm')->nullable();
            $table->string('law_firm_province')->nullable();      
            $table->string('law_firm_city')->nullable();           
            $table->text('law_firm_address')->nullable();    
            $table->string('law_firm_phone')->nullable();    

            // Alamat Rumah
            $table->text('home_address')->nullable();        
            $table->string('home_phone')->nullable();        
            $table->string('personal_phone')->nullable();    

            // Alamat Korespondensi
            $table->string('correspondence_address')->nullable();
            $table->string('correspondence_city')->nullable();      
            $table->string('correspondence_province')->nullable();  
            $table->string('correspondence_postal_code')->nullable();
            $table->string('correspondence_phone')->nullable();     
            $table->string('email')->unique()->nullable();

            // Status
            $table->enum('status', ['active', 'inactive'])->default('active');

            // File Upload
            $table->string('face_photo')->nullable();          

            // Akun login konsultan
            $table->string('password')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultants');
    }
};