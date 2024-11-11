import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RupiahPipe } from '../../pipe/rupiah.pipe';
import { NavigationComponent } from '../navigation/navigation.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { MobilApiService } from '../../services/mobil-api.service';
import { Mobil } from '../../models/mobil.model';

@Component({
  selector: 'app-manajemen-mobil',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, RupiahPipe, AlertComponent, NavigationComponent],
  templateUrl: './manajemen-mobil.component.html',
  styleUrl: './manajemen-mobil.component.css'
})
export class ManajemenMobilComponent implements OnInit {

  constructor(private mobilApiService: MobilApiService, private alertService: AlertService){}

  title = 'Manajemen Mobil';
  
  ngOnInit(): void {
    this.getSemuaMobilData();
  }
  
  semuaMobilData: Mobil[] = [];
  getSemuaMobilData(): void
  {
    this.mobilApiService.getAllMobil().subscribe(
      (data: Mobil[]) => {
        this.semuaMobilData = data;
        this.applyFilter();
      },
      (error) => {
        this.alertService.showAlert('Gagal mendapatkan data mobil.', 'error');
      }
    );
  }
  
  search = { merek: '', model: '', is_booked: '' };
  dataMobilFiltered = this.semuaMobilData;
  applyFilter() 
  {
    const { merek, model, is_booked } = this.search;
    this.dataMobilFiltered = this.semuaMobilData.filter(mobil => {
      const matchesMerek = mobil.merek.toLowerCase().includes(merek.toLowerCase());
      const matchesModel = mobil.model.toLowerCase().includes(model.toLowerCase());
      let matchesStatus = is_booked === '' || mobil.is_booked.toString() === is_booked;
      return matchesMerek && matchesModel && matchesStatus;
    });
  }

  isModalAddEditOpen = false;
  isEditMode = false;
  formMobilData: Mobil = { id: '', merek: '', model: '', nomor_plat: '', tarif_sewa_harian: null, is_booked: false };
  openModalTambahMobil(): void
  {
    this.isEditMode = false;
    this.isModalAddEditOpen = true;
    this.formMobilData = { id: '', merek: '', model: '', nomor_plat: '', tarif_sewa_harian: null, is_booked: false };
  }

  openModalEditMobil(mobil: Mobil): void
  {
    this.isEditMode = true;
    this.isModalAddEditOpen = true;
    this.formMobilData = { ...mobil };
  }

  onSubmit(): void
  {
    if(this.isEditMode){
      this.mobilApiService.editMobil(this.formMobilData).subscribe(
        response => {
          this.alertService.showAlert(response.message, 'success');
          this.getSemuaMobilData();
          this.applyFilter();
          this.closeModal();
        },
        error => {
          this.alertService.showAlert(error.error.message, 'error');
        }
      )
    } 
    else {
      this.mobilApiService.tambahMobil(this.formMobilData).subscribe(
        response => {
          this.alertService.showAlert(response.message, 'success');
          this.getSemuaMobilData();
          this.applyFilter();
          this.closeModal();
        },
        error => {
          this.alertService.showAlert(error.error.message, 'error');
        }
      )
    }
  }

  isModalDeleteOpen = false;
  detailMobil = "";
  openModalHapusMobil(mobil: Mobil): void
  {
    this.isModalDeleteOpen = true;
    this.formMobilData = { ...mobil };
    this.detailMobil = mobil.merek + ' - ' + mobil.model + ' - ' + mobil.nomor_plat;
  }

  onHapus(): void
  {
    this.mobilApiService.hapusMobil(this.formMobilData.id).subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
        this.getSemuaMobilData();
        this.applyFilter();
        this.closeModal();
      },
      error => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    )
  }

  closeModal(): void
  {
    this.isModalAddEditOpen = false;
    this.isModalDeleteOpen = false;
  }
}
