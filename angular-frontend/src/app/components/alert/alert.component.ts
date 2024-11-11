import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  
  constructor(public alertService: AlertService) {
    this.alert = this.alertService.alert;
  }

  alert: Observable<any>;
}
