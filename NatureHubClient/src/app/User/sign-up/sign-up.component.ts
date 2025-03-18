import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../Models/auth.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  registerData: RegisterRequest = {
    Name: '',
    Email: '',
    Password: '',
  };
  confirmPassword: string = ''; // New field
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    // Ensure the video starts playing
    if (this.bgVideo?.nativeElement) {
      this.bgVideo.nativeElement.play().catch((error) => {
        console.error('Autoplay blocked:', error);
      });
    }
  }

  onSubmit(registerForm: NgForm) {
    if (
      registerForm.invalid ||
      this.registerData.Password !== this.confirmPassword
    )
      return; // Stop if form is invalid or passwords don't match

    this.isLoading = true;
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']); // Redirect to login after signup
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Try again.';
        this.isLoading = false;
      },
    });
  }
}
