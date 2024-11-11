import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../alert/alert.component';
import { PengembalianApiService } from '../../services/pengembalian-api.service';
import { Pengembalian } from '../../models/pengembalian.model';
import { RupiahPipe } from '../../pipe/rupiah.pipe';

@Component({
  selector: 'app-pengembalian-mobil',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, RupiahPipe, NavigationComponent],
  templateUrl: './pengembalian-mobil.component.html',
  styleUrl: './pengembalian-mobil.component.css'
})
export class PengembalianMobilComponent {

  constructor(private pengembalianApiService: PengembalianApiService, private alertService: AlertService){}
  
  title = "Pengembalian Mobil"

  isHaveResult = false;
  
  platNomor = "";
  detailMobil = "";
  pengembalianData: Pengembalian = { id: '', pengguna_id: '', mobil_id: '', pengguna: null, mobil: null, tanggal_mulai: '', tanggal_selesai: '', jumlah_biaya: 0, status: 0 }
  cekPlatNomor(): void
  {
    this.pengembalianApiService.cekPlatNomor(this.platNomor).subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
        this.pengembalianData = response.detail_pengembalian;
        this.detailMobil = this.pengembalianData.mobil?.merek + ' - ' + this.pengembalianData.mobil?.model + ' - ' + this.pengembalianData.mobil?.nomor_plat;
        this.isHaveResult = true;
      },
      error => {
        this.alertService.showAlert(error.error.message, 'error');
        this.isHaveResult = false;
      }
    )
  }

  isModalProsesPengembalianOpen = false;
  openModalPengembalian(): void
  {
    this.isModalProsesPengembalianOpen = true;
  }

  onPengembalian(): void
  {
    this.pengembalianData.status = 1;
    this.pengembalianApiService.prosesPengembalian(this.pengembalianData).subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
        this.closeModal();
        this.isHaveResult = true;
      },
      error => {
        this.pengembalianData.status = 0;
        this.alertService.showAlert(error.error.message, 'error');
      }
    )
  }

  closeModal(): void
  {
    this.isModalProsesPengembalianOpen = false;
  }

  formatTanggal(inputDate: string): string {
    const date = new Date(inputDate); 
    const formatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return formatter.format(date);
  }

  hitungHari(tanggal_mulai: string, tanggal_akhir: string) {
    const start = new Date(tanggal_mulai);
    const end = new Date(tanggal_akhir);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
  }
}
