import { Mobil } from "./mobil.model";
import { Pengguna } from "./pengguna.model";

export interface Pengembalian {
    id: string;
    pengguna_id: string;
    mobil_id: string;
    pengguna: Pengguna | null;
    mobil: Mobil | null;
    tanggal_mulai: string;
    tanggal_selesai: string;
    jumlah_biaya: number;
    status: number;
}