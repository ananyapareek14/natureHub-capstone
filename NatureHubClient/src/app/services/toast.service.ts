import { Injectable } from '@angular/core';

export interface Toast {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];

  showSuccess(message: string, title = 'Success', duration = 3000) {
    this.show(title, message, 'success', duration);
  }

  showError(message: string, title = 'Error', duration = 3000) {
    this.show(title, message, 'error', duration);
  }

  showInfo(message: string, title = 'Info', duration = 3000) {
    this.show(title, message, 'info', duration);
  }

  public show(
    title: string,
    message: string,
    type: 'success' | 'error' | 'info',
    duration = 3000
  ) {
    const toast: Toast = { title, message, type };
    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), duration);
  }

  public remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
