import { Component } from '@angular/core';
import { LoginRequest } from '../../Models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  loginData: LoginRequest = {
    Email: '',
    Password: ''
  };
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginData).subscribe({
      next: response => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.Token);
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error: error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password';
        this.isLoading = false;
      }
    });
  }
}
