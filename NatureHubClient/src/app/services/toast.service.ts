import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(title: string, message: string, type: 'success' | 'error' | 'info', duration = 3000) {
    const toast = { title, message, type };
    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), duration);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
