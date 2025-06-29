<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\RecentAvatars;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'discriminator',
        'email',
        'password',
        'avatar',
        'status',
        'about_me',
        'last_seen',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Relasi ke tabel avatars
     */
    public function avatars() {
        return $this->hasMany(RecentAvatars::class);
    }

    public function ownedServers()
    {
        return $this->hasMany(Server::class, 'owner_id');
    }

    public function joinedServers()
    {
        return $this->belongsToMany(Server::class, 'server_users', 'users_id', 'servers_id');
    }
}
