<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddShopIdToAffiliatesTable extends Migration
{
    public function up()
    {
        Schema::table('affiliates', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->after('id');
            $table->foreign('shop_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('affiliates', function (Blueprint $table) {
            $table->dropForeign(['shop_id']);
            $table->dropColumn('shop_id');
        });
    }
}
