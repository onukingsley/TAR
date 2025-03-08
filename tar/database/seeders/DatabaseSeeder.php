<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Driver;
use App\Models\TarPayment;
use App\Models\TarToken;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory(3)->state(['usertype'=>'0'])->create();


        User::factory(5)->has(Driver::factory(),'Driver')->create();

        User::factory(15)->state(['userType'=>'2'])->has(TarPayment::factory(10),'tarPayment')->has(TarToken::factory(),'tarToken')->create();


    }
}
