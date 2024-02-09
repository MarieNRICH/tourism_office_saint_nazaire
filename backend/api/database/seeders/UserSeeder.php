<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * @return void
     */
    public function run(): void
    {

        // Admin User
        DB::table('users')->insert([
            'username' => 'admin',
            'password' => Hash::make('adminpassword'),
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'remember_token' => Str::random('10'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Regular User
        DB::table('users')->insert([
            'username' => 'user',
            'password' => Hash::make('userpassword'),
            'email' => 'user@example.com',
            'email_verified_at' => now(),
            'remember_token' => Str::random('10'),
            'role' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // création de 8users aléatoires
        User::factory(8)->create();
    }
}
