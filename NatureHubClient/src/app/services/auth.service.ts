// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, Observable, tap, throwError } from 'rxjs';
// import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../Models/auth.model';
// import { environment } from '../environment/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   register(data: RegisterRequest): Observable<RegisterResponse> {
//     console.log('Sending register request:', data);
//     return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, data).pipe(
//       tap(response => console.log('Register Response:', response)),
//       catchError(this.handleError)
//     );
//   }

//   login(data: LoginRequest): Observable<LoginResponse> {
//     console.log('Sending login request:', data);
//     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data).pipe(
//       tap(response => {
//         console.log('Login Response:', response);
//         this.saveToken(response.Token);
//       }),
//       catchError(this.handleError)
//     );
//   }

//   saveToken(token: string): void {
//     console.log('Saving token:', token);
//     localStorage.setItem('jwtToken', token);
//   }

//   getToken(): string | null {
//     const token = localStorage.getItem('jwtToken');
//     console.log('Retrieved token:', token);
//     return token;
//   }

//   logout(): void {
//     console.log('Logging out');
//     localStorage.removeItem('jwtToken');
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error('API Error:', error);
//     return throwError(() => new Error(error.message || 'Something went wrong'));
// }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   getUserName(): string {
//     return 'John Doe';
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../Models/auth.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    console.log('🚀 Sending login request:', data);
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap((response) => {
          console.log('✅ Login Response:', response);
          this.saveToken(response.Token);
        }),
        catchError(this.handleError)
      );
  }

  // login(credentials: ILoginCredentials) {
  //   return this.http.post<ILogin>(`${this.apiUrl}/auth/login`, credentials, {
  //     headers: { 
  //       'Content-Type': 'application/json' 
  //     },
  //   }).pipe(
  //     tap((loginResponse) => {
  //       const email = loginResponse.email; // Ensure your response has an `email` field
  //       if (email) {
  //         this.setUserEmail(email); // Update the observable
  //       }
  //         localStorage.setItem(
  //           this.AUTH_KEY,
  //           JSON.stringify(loginResponse)
  //         );
  //     }),
  //   );
  // }

  saveToken(token: string): void {
    console.log('💾 Saving token:', token);
    localStorage.setItem('jwtToken', token);
    console.log('🔍 Token after saving:', this.getToken());
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    console.log('📥 Retrieved token from storage:', token);
    return token;
  }

  logout(): void {
    console.log('🔴 Logging out, removing token.');
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ API Error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
