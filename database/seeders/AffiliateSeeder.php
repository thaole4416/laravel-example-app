<?php

namespace Database\Seeders;

use App\Models\Affiliate;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class AffiliateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $user = User::first(); // Lấy người dùng đầu tiên để làm shop_id

        for ($i = 0; $i < 100; $i++) {
            Affiliate::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'shop_id' => $user->id, 
            ]);
        }
    }
}
