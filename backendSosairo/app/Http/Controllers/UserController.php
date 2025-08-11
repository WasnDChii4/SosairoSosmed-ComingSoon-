<?php

namespace App\Http\Controllers;

use App\Models\RecentAvatars;
use App\Models\Server;
use App\Models\User;
use App\Models\Category;
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

    public function getServerById($serverId) {
        $server = Server::with([
            'categories' => function ($query) {
                $query->orderBy('position', 'asc')->orderBy('created_at', 'asc');
            },
            'categories.channels' => function ($query) {
                $query->orderBy('position', 'asc')->orderBy('created_at', 'asc');
            },
            'channels' => function ($query) {
                $query->whereNull('category_id')->orderBy('position', 'asc')->orderBy('created_at', 'asc');
            }
        ])->find($serverId);

        if (!$server) {
            return response()->json([
                'success' => false,
                'message' => 'Server not found',
                'name_server' => "Server {$serverId}"
            ], 404);
        }

        $textChannels = $server->channels->where('type', 'text')->values();
        $voiceChannels = $server->channels->where('type', 'voice')->values();

        return response()->json([
            'success' => true,
            'id' => $server->id,
            'name_server' => $server->name_server,
            'icon' => $server->icon_path ? asset('storage/' . $server->icon_path) : null,
            'description' => $server->description,
            'categories' => $server->categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'position' => $category->position ?? 0,
                    'created_at' => $category->created_at,
                    'channels' => $category->channels->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'name' => $channel->name,
                            'type' => $channel->type,
                            'position' => $channel->position ?? 0,
                            'created_at' => $channel->created_at,
                        ];
                    }),
                ];
            }),
            'text_channels' => $textChannels->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                    'position' => $channel->position ?? 0,
                ];
            }),
            'voice_channels' => $voiceChannels->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                    'position' => $channel->position ?? 0,
                ];
            }),
            'created_at' => $server->created_at,
            'updated_at' => $server->updated_at,
        ]);
    }


    public function createCategory(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'server_id' => 'required|exists:servers,id',
        ]);

        $userId = auth()->id();

        $position = Category::where('server_id', $request->server_id)->max('position') ?? 0;
        $nextPosition = $position + 1;

        $category = Category::create([
            'name' => $request->name,
            'server_id' => $request->server_id,
            'created_by' => $userId,
            'position' => $nextPosition,
        ]);

        $category->load('channels');

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category,
        ]);
    }

    public function getCategoriesByServer($serverId) {
        $categories = Category::forServer($serverId)
            ->with('channels')
            ->orderBy('position')
            ->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }
}
