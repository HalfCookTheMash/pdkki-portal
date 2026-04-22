<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('consultants', function (Blueprint $table) {
            $table->string('inactive_document')->nullable()->after('status');
            $table->text('inactive_reason')->nullable()->after('inactive_document');
        });
    }

    public function down(): void
    {
        Schema::table('consultants', function (Blueprint $table) {
            $table->dropColumn(['inactive_document', 'inactive_reason']);
        });
    }
};
