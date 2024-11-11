<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ManajemenMobil extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $mobil = Mobil::with('peminjaman')->get();
        $mobilData = $mobil->map(function ($m) use($today) {
            $isBooked = $m->peminjaman->some(function ($peminjaman) use ($today) {
                return $peminjaman->tanggal_mulai <= $today && 
                       $peminjaman->tanggal_selesai >= $today && 
                       $peminjaman->status == 0;
            });
            return [
                'id' => $m->id,
                'merek' => $m->merek,
                'model' => $m->model,
                'nomor_plat' => $m->nomor_plat,
                'tarif_sewa_harian' => $m->tarif_sewa_harian,
                'is_booked' => $isBooked
            ];
        });
        return response()->json($mobilData);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'merek' => 'required',
            'model' => 'required',
            'nomor_plat' => 'required|unique:mobil,nomor_plat',
            'tarif_sewa_harian' => 'required|numeric',
        ], [
            'merek.required' => 'Merek wajib diisi.',

            'model.required' => 'Model wajib diisi.',
            
            'nomor_plat.required' => 'Nomor plat wajib diisi.',
            'nomor_plat.unique' => 'Nomor plat telah terdaftar.',
            
            'tarif_sewa_harian.required' => 'Tarif sewa harian wajib diisi.',
            'tarif_sewa_harian.numeric' => 'Tarif sewa harian harus berupa angka.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        Mobil::create([
            'merek' => $request->merek,
            'model' => $request->model,
            'nomor_plat' => $request->nomor_plat,
            'tarif_sewa_harian' => $request->tarif_sewa_harian
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan data mobil.'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $mobil = Mobil::find($id);

        if (!$mobil) {
            return response()->json(['message' => 'Data mobil tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'merek' => 'required',
            'model' => 'required',
            'nomor_plat' => 'required|unique:mobil,nomor_plat,'.$mobil->id,
            'tarif_sewa_harian' => 'required|numeric',
        ], [
            'merek.required' => 'Merek wajib diisi.',

            'model.required' => 'Model wajib diisi.',
            
            'nomor_plat.required' => 'Nomor plat wajib diisi.',
            'nomor_plat.unique' => 'Nomor plat telah terdaftar.',
            
            'tarif_sewa_harian.required' => 'Tarif sewa harian wajib diisi.',
            'tarif_sewa_harian.numeric' => 'Tarif sewa harian harus berupa angka.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        $mobil->update($request->except(['id', 'is_booked']));
        return response()->json(['message' => 'Berhasil memperbarui data mobil.']);
    }

    public function destroy($id)
    {
        $mobil = Mobil::find($id);

        if (!$mobil) {
            return response()->json(['message' => 'Data mobil tidak ditemukan.'], 404);
        }

        $mobil->delete();
        return response()->json(['message' => 'Berhasil menghapus data mobil.']);
    }
}
