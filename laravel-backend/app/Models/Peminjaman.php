<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Peminjaman extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'peminjaman';

    protected $fillable = [
        'pengguna_id', 
        'mobil_id', 
        'tanggal_mulai', 
        'tanggal_selesai',
        'jumlah_biaya',
        'status',
    ];

    protected $casts = [
        'jumlah_biaya' => 'integer',
        'status' => 'integer',
    ];

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'pengguna_id');
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    const DELETED_AT = 'deleted_at';
}
