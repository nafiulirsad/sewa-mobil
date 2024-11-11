<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeminjamanMobil extends Controller
{
    public function tersedia()
    {
        $mobilTersedia = Mobil::with('peminjaman')->get();
        return response()->json($mobilTersedia);
    }

    public function dipinjam($penggunaId)
    {
        $mobilDipinjam = Peminjaman::with('mobil')->where('pengguna_id', $penggunaId)->get();
        return response()->json($mobilDipinjam);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pengguna_id' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'mobil_id' => 'required',
            'jumlah_biaya' => 'required|numeric',
            'status' => 'required|numeric',
        ], [
            'pengguna_id.required' => 'ID pengguna tidak valid, hubungi admin.',

            'tanggal_mulai.required' => 'Tanggal mulai wajib diisi.',
            'tanggal_mulai.date' => 'Format tanggal mulai tidak valid.',
            
            'tanggal_selesai.required' => 'Tanggal selesai wajib diisi.',
            'tanggal_selesai.date' => 'Format tanggal selesai tidak valid.',
            'tanggal_selesai.after_or_equal' => 'Tanggal selesai wajib minimal sama dengan atau lebih besar dari tanggal mulai.',

            'mobil_id.required' => 'Mobil yang akan dipinjam wajib dipilih.',
            
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

        $peminjamanExisting = Peminjaman::where('mobil_id', $request->mobil_id)
            ->where(function ($query) use ($request) {
                $query->where('status', 0)->whereBetween('tanggal_mulai', [$request->tanggal_mulai, $request->tanggal_selesai])
                    ->orWhereBetween('tanggal_selesai', [$request->tanggal_mulai, $request->tanggal_selesai])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('tanggal_mulai', '<=', $request->tanggal_mulai)
                                ->where('tanggal_selesai', '>=', $request->tanggal_selesai)
                                ->where('status', 0);
                    });
            })
            ->exists();

        if ($peminjamanExisting) {
            return response()->json([
                'message' => 'Mobil telah dipinjam pada periode yang dipilih.',
            ], 400);
        }

        Peminjaman::create([
            'pengguna_id' => $request->pengguna_id,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
            'mobil_id' => $request->mobil_id,
            'jumlah_biaya' => $request->jumlah_biaya,
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan data peminjaman mobil.'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Data peminjaman tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
        ], [
            'tanggal_mulai.required' => 'Tanggal mulai wajib diisi.',
            'tanggal_mulai.date' => 'Format tanggal mulai tidak valid.',
            
            'tanggal_selesai.required' => 'Tanggal selesai wajib diisi.',
            'tanggal_selesai.date' => 'Format tanggal selesai tidak valid.',
            'tanggal_selesai.after_or_equal' => 'Tanggal selesai wajib minimal sama dengan atau lebih besar dari tanggal mulai.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        $peminjamanExisting = Peminjaman::where('mobil_id', $request->mobil_id)->where('id', '!=', $id)
            ->where(function ($query) use ($request) {
                $query->where('status', 0)->whereBetween('tanggal_mulai', [$request->tanggal_mulai, $request->tanggal_selesai])
                    ->orWhereBetween('tanggal_selesai', [$request->tanggal_mulai, $request->tanggal_selesai])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('tanggal_mulai', '<=', $request->tanggal_mulai)
                                ->where('tanggal_selesai', '>=', $request->tanggal_selesai)
                                ->where('status', 0);
                    });
            })
            ->exists();

        if ($peminjamanExisting) {
            return response()->json([
                'message' => 'Mobil telah dipinjam pada periode yang dipilih.',
            ], 400);
        }

        $peminjaman->update($request->only(['tanggal_mulai', 'tanggal_selesai']));
        return response()->json(['message' => 'Berhasil memperbarui data mobil.']);
    }

    public function destroy($id)
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Data peminjaman tidak ditemukan.'], 404);
        }

        $peminjaman->delete();
        return response()->json(['message' => 'Berhasil menghapus data peminjaman.']);
    }
}
