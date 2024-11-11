<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PengembalianMobil extends Controller
{
    public function cekPlatNomor(Request $request)
    {
        $pengguna = JWTAuth::parseToken()->authenticate();
        $detailPengembalian = Peminjaman::with(['mobil','pengguna'])
            ->where('status', 0)
            ->orderBy('tanggal_mulai', 'asc')
            ->whereHas('mobil', function ($query) use($request) {
                $query->where('nomor_plat', $request->nomor_plat);
            })
            ->whereHas('pengguna', function ($query) use($pengguna) {
                $query->where('id', $pengguna->id);
            })
            ->get();
        if ($detailPengembalian->isNotEmpty()) {
            $detailPengembalian = $detailPengembalian->first();
            $detailPengembalian['jumlah_biaya'] = $detailPengembalian['jumlah_biaya'] == 0 ? $detailPengembalian['mobil']['tarif_sewa_harian'] * $this->hitungHari($detailPengembalian['tanggal_mulai'], $detailPengembalian['tanggal_selesai']) : $detailPengembalian['jumlah_biaya'];
            return response()->json([
                'message' => 'Berhasil mendapatkan data peminjaman mobil anda dengan nomor plat ' . $request->nomor_plat . '.',
                'detail_pengembalian' => $detailPengembalian
            ], 200);
        } else {
            return response()->json(['message' => 'Data peminjaman mobil anda dengan nomor plat ' . $request->nomor_plat . ' tidak ditemukan.'], 404);
        }
    }

    public function proses(Request $request, $id)
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Data peminjaman tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'jumlah_biaya' => 'required|numeric',
            'status' => 'required|numeric',
        ], [
            'jumlah_biaya.required' => 'Jumlah biaya tidak valid, hubungi admin.',
            'jumlah_biaya.numeric' => 'Jumlah biaya tidak valid, hubungi admin.',
            
            'tarif_sewa_harian.required' => 'Tarif sewa harian tidak valid, hubungi admin.',
            'tarif_sewa_harian.numeric' => 'Tarif sewa harian tidak valid, hubungi admin.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        $peminjaman->update($request->only(['jumlah_biaya', 'status']));
        return response()->json(['message' => 'Berhasil memproses pengembalian pinjaman mobil anda.']);
    }

    public function hitungHari($tanggal_mulai, $tanggal_akhir)
    {
        $start = Carbon::parse($tanggal_mulai);
        $end = Carbon::parse($tanggal_akhir);
        return $start->diffInDays($end) + 1;
    }
}
