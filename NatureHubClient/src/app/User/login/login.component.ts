import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../Models/auth.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  loginData: LoginRequest = {
    Email: '',
    Password: '',
  };
  errorMessage: string | null = null;
  isLoading = false;

  currentView: string = 'login'; // Track the current view

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    // Ensure the video starts playing
    if (this.bgVideo?.nativeElement) {
      this.bgVideo.nativeElement.play().catch((error) => {
        console.error('Autoplay blocked:', error);
      });
    }
  }

  login() {
    this.isLoading = true; // Start loading indicator
    this.errorMessage = null; // Clear previous errors

    this.authService.login(this.loginData).subscribe({
      next: (loginResponse) => {
        this.isLoading = false; // Stop loading
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.isLoading = false; // Stop loading
        console.error('Login failed:', err);
        this.errorMessage =
          'Login failed. Please check your credentials and try again.';
      },
    });
  }
}
