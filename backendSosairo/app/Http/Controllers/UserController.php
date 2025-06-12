<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:12|confirmed',
        ]);

        $username = Str::slug($request->name);
        $discriminator = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

        while (User::where('username', $username)->where('discriminator', $discriminator)->exists()) {
            $discriminator = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $username,
            'discriminator' => $discriminator,
            'avatar' => 'storage/avatars/sosairo-logo1.png',
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->remember ?? false;

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('sosairo_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => Auth::user(),
            'token' => $token
        ]);
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    public function updateProfile(Request $request) {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'about_me' => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    public function updateAvatar(Request $request) {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = auth()->user();

        if ($user->avatar && Storage::disk('public')->exists(str_replace('storage/', '', $user->avatar))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $user->avatar));
        }

        $avatar = $request->file('avatar');
        $filename = 'avatars/' . Str::uuid() . '.' . $avatar->getClientOriginalExtension();

        Storage::disk('public')->put($filename, file_get_contents($avatar));

        $user->avatar = 'storage/' . $filename;
        $user->save();

        return response()->json([
            'message' => 'Avatar updated successfully.',
            'avatar' => $user->avatar,
        ]);
    }
}
