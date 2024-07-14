<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCustomerNameAndEmailToConnectCustomerTable extends Migration
{
    public function up()
    {
        Schema::table('connect_customers', function (Blueprint $table) {
            $table->string('customer_name')->after('shopify_customer_id');
            $table->string('customer_email')->after('customer_name');
        });
    }

    public function down()
    {
        Schema::table('connect_customers', function (Blueprint $table) {
            $table->dropColumn(['customer_name', 'customer_email']);
        });
    }
}
