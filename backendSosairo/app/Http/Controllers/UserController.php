<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Category;
use App\Models\Channel;
use App\Models\RecentAvatars;
use App\Models\Server;
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

        $currentAvatar = $user->avatar;

        $isDefaultAvatar = $currentAvatar && str_contains($currentAvatar, 'sosairo-logo1.png');

        if (!$isDefaultAvatar && $currentAvatar && Storage::disk('public')->exists(str_replace('storage/', '', $currentAvatar))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $currentAvatar));
        }

        $avatar = $request->file('avatar');
        $filename = 'avatars/' . Str::uuid() . '.' . $avatar->getClientOriginalExtension();
        Storage::disk('public')->put($filename, file_get_contents($avatar));

        $user->avatar = 'storage/' . $filename;
        $user->save();

        RecentAvatars::create([
            'user_id' => $user->id,
            'path' => $user->avatar,
        ]);

        return response()->json([
            'message' => 'Avatar updated successfully.',
            'avatar' => $user->avatar,
        ]);
    }

    public function deleteRecentAvatars() {
        $user = auth()->user();
        $avatars = $user->avatars()->latest()->take(6)->get();

        return response()->json($avatars);
    }

    public function storeServer(Request $request) {
        $request->validate([
            'name_server' => 'required|string|max:255',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $slug = Str::slug($request->name) . '-' . uniqid();

        $server = new Server();
        $server->name_server = $request->name_server;
        $server->slug = $slug;
        $server->owner_id = auth()->id();
        $server->is_public = true;
        $server->description = null;

        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('icons', 'public');
            $server->icon_path = $path;
        }

        $server->save();

        $server->members()->attach(auth()->id());

        return response()->json([
            'message' => 'Server created successfully',
            'server' => $server
        ]);
    }

    public function getServer(Request $request) {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $servers = $user->joinedServers()->with('owner')->get();

        foreach ($servers as $server) {
            $server->icon = $server->icon_path
                ? asset('storage/' . $server->icon_path)
                : null;
        }

        return response()->json([
            'servers' => $servers
        ]);
    }

    public function getServerById($id) {
        $server = Server::with([
            'categories.channels',
            'channels' => function ($q) {
                $q->whereNull('category_id');
            }
        ])->find($id);

        if (!$server) {
            return response()->json(['message' => 'Server not found'], 404);
        }

        $textChannels = $server->channels->where('type', 'text')->values();
        $voiceChannels = $server->channels->where('type', 'voice')->values();

        return response()->json([
            'name_server' => $server->name_server,
            'icon' => $server->icon_path ? asset('storage/' . $server->icon_path) : null,
            'categories' => $server->categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'channels' => $category->channels->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'name' => $channel->name,
                            'type' => $channel->type,
                        ];
                    }),
                ];
            }),
            'text_channels' => $textChannels->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                ];
            }),
            'voice_channels' => $voiceChannels->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                ];
            }),
        ]);
    }

    public function createCategory(Request $request) {
        $request->validate([
            'server_id' => 'required|exists:servers,id',
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'server_id' => $request->server_id,
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Category created', 'category' => $category], 201);
    }

    public function createChannel(Request $request) {
        $request->validate([
            'server_id' => 'required|exists:servers,id',
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:255',
            'type' => 'required|in:text,voice',
        ]);

        $channel = Channel::create([
            'server_id' => $request->server_id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'type' => $request->type,
        ]);

        return response()->json(['message' => 'Channel created', 'channel' => $channel]);
    }
}
