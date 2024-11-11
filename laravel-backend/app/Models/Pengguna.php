<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Pengguna extends Model implements Authenticatable, JWTSubject
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengguna';
    
    protected $fillable = [
        'nama', 
        'alamat', 
        'nomor_telepon', 
        'nomor_sim', 
        'username', 
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'nomor_telepon' => 'integer',
        'nomor_sim' => 'integer',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return null;
    }

    public function setRememberToken($value)
    {
        // 
    }

    public function getRememberTokenName()
    {
        return '';
    }

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'pengguna_id');
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    const DELETED_AT = 'deleted_at';
}
