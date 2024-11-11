import { Mobil } from "./mobil.model";

export interface Peminjaman {
    id: string;
    pengguna_id: string;
    mobil_id: string;
    mobil: Mobil | null;
    tanggal_mulai: string;
    tanggal_selesai: string;
    jumlah_biaya: number;
    status: number;
}