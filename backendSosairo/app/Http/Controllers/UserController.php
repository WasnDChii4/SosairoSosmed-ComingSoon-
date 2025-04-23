<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:225',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:12|confirmed',
        ]);

        $username = Str::slug($request->name); //Mengubah nama menjadi format slug
        $discriminator = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT); //Membuat angka acak 4 digit

        //Digunakan untuk mengacak ulang angka discriminator, agar tidak sama ketika username sama
        while (User::where('username', $username)->where('discriminator', $discriminator)->exists()) {
            $discriminator = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        };

        //Membuat user baru dan menyimpan ke database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $username,
            'discriminator' => $discriminator,
        ]);

        //Token untuk sanctum
        $token = $user->createToken('authToken')->plainTextToken;

        //Mengirim response ke frontend
        return response()->json([
            'message' => 'User registered successfullly',
            'user' => $user,
            'remember_token' => $token,
        ]);
    }
}
