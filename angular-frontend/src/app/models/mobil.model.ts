export interface Mobil {
    id: string;
    merek: string;
    model: string;
    nomor_plat: string;
    tarif_sewa_harian: number | null;
    is_booked: boolean;
}