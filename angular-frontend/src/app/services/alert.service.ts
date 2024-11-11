import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Alert {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert = this.alertSubject.asObservable();

  showAlert(message: string, type: 'success' | 'error'): void
  {
    this.alertSubject.next({ message, type });
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert(): void
  {
    this.alertSubject.next(null);
  }
}
