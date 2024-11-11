<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class Auth extends Controller
{
    public function registrasi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'username' => 'required|unique:pengguna,username',
            'password' => 'required|confirmed',
            'nomor_telepon' => 'required|numeric',
            'nomor_sim' => 'required|numeric',
            'alamat' => 'required',
        ], [
            'nama.required' => 'Nama wajib diisi.',
            
            'username.required' => 'Username wajib diisi.',
            'username.unique' => 'Username telah terdaftar.',
            
            'password.required' => 'Password wajib diisi.',
            'password.confirmed' => 'Konfirmasi password tidak sesuai.',
            
            'nomor_telepon.required' => 'Nomor Telepon wajib diisi.',
            'nomor_telepon.numeric' => 'Nomor Telepon harus berupa angka.',
            
            'nomor_sim.required' => 'Nomor SIM wajib diisi.',
            'nomor_sim.numeric' => 'Nomor SIM harus berupa angka.',
            
            'alamat.required' => 'Alamat wajib diisi.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        $pengguna = Pengguna::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'nomor_telepon' => $request->nomor_telepon,
            'nomor_sim' => $request->nomor_sim,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($pengguna);

        return response()->json([
            'message' => 'Berhasil mendaftar, anda akan diarahkan ke halaman selanjutnya.',
            'pengguna' => $pengguna,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        $validator = Validator::make($credentials, [
            'username' => 'required',
            'password' => 'required',
        ], [
            'username.required' => 'Username wajib diisi.',
            'password.required' => 'Password wajib diisi.',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errorMessages = implode(', ', $errors);
            return response()->json(['message' => $errorMessages], 400);
        }

        $pengguna = Pengguna::where('username', $request->username)->first();

        if (!$pengguna || !Hash::check($request->password, $pengguna->password)) {
            return response()->json(['message' => 'Username tidak terdaftar atau password anda salah.'], 401);
        }
        
        $token = JWTAuth::fromUser($pengguna);
        return response()->json([
            'message' => 'Berhasil login, anda akan diarahkan ke halaman selanjutnya.',
            'pengguna' => $pengguna,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Berhasil logout, silakan login kembali untuk menggunakan aplikasi.'], 200);
    }

    public function refreshToken(Request $request)
    {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        return response()->json(['token' => $newToken], 200);
    }

    public function verifyToken(Request $request)
    {
        try {
            $pengguna = JWTAuth::parseToken()->authenticate();
            return response()->json(['pengguna' => $pengguna], 200);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Sesi login anda telah kadaluarsa, silakan login kembali untuk menggunakan aplikasi.'], 401);
        }
    }
}
