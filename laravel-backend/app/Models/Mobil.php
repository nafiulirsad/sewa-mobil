<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Mobil extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mobil';

    protected $fillable = [
        'merek', 
        'model', 
        'nomor_plat', 
        'tarif_sewa_harian'
    ];

    protected $casts = [
        'tarif_sewa_harian' => 'integer',
    ];

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'mobil_id');
    }

    public function scopeMobilTersedia($query)
    {
        $today = now()->toDateString();
        return $query->whereDoesntHave('peminjaman', function ($query) use ($today) {
            $query->whereDate('tanggal_mulai', '<=', $today)->whereDate('tanggal_selesai', '>=', $today)->where('status', 0);
        });
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    const DELETED_AT = 'deleted_at';
}
