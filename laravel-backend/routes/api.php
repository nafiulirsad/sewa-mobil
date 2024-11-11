<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\ManajemenMobil;
use App\Http\Controllers\PeminjamanMobil;
use App\Http\Controllers\PengembalianMobil;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// ROUTE AUTHENTICATION
Route::prefix('auth')->group(function () {
    Route::post('/registrasi', [Auth::class, 'registrasi']);
    Route::post('/login', [Auth::class, 'login']);
    Route::post('/logout', [Auth::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh-token', [Auth::class, 'refreshToken'])->middleware('auth:api');
    Route::get('/verify-token', [Auth::class, 'verifyToken'])->middleware('auth:api');
});

// ROUTE MANAJEMEN MOBIL
Route::middleware('auth:api')->prefix('manajemen-mobil')->group(function () {
    Route::get('/', [ManajemenMobil::class, 'index']);
    Route::post('/', [ManajemenMobil::class, 'store']);
    Route::put('{id}', [ManajemenMobil::class, 'update']);
    Route::delete('{id}', [ManajemenMobil::class, 'destroy']);
});

// ROUTE PEMINJAMAN MOBIL
Route::middleware('auth:api')->prefix('peminjaman-mobil')->group(function () {
    Route::get('/tersedia', [PeminjamanMobil::class, 'tersedia']);
    Route::get('/dipinjam/{id}', [PeminjamanMobil::class, 'dipinjam']);
    Route::post('/', [PeminjamanMobil::class, 'store']);
    Route::put('{id}', [PeminjamanMobil::class, 'update']);
    Route::delete('{id}', [PeminjamanMobil::class, 'destroy']);
});

// ROUTE PENGEMBALIAN MOBIL
Route::middleware('auth:api')->prefix('pengembalian-mobil')->group(function () {
    Route::post('/cek-plat-nomor', [PengembalianMobil::class, 'cekPlatNomor']);
    Route::put('/proses/{id}', [PengembalianMobil::class, 'proses']);
});