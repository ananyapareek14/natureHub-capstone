import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../Models/auth.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginRequest = {
    Email: '',
    Password: ''
  };
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastService: ToastService // Inject ToastService
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginData).subscribe({
      next: response => {
        this.authService.saveToken(response.Token);
        this.toastService.show('Success', 'Login successful!', 'success'); // Show success toast
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        this.toastService.show('Error', 'Invalid email or password', 'error'); // Show error toast
        this.isLoading = false;
      }
    });
  }
}
