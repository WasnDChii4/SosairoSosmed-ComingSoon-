<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Server extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_server',
        'slug',
        'description',
        'icon_path',
        'is_public',
        'owner_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($server) {
            $baseSlug = Str::slug($server->name);
            $slug = $baseSlug;
            $count = 1;

            while (Server::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            $server->slug = $slug;
        });
    }

    public function channels() {
        return $this->hasMany(Channel::class);
    }

    public function categories() {
        return $this->hasMany(related: Category::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'server_users', 'servers_id', 'users_id');
    }
}
