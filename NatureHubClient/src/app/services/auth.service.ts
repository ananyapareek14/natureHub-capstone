import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../Models/auth.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly user_id = 'UserId';
  private userIdSubject = new BehaviorSubject<string>(''); // Initial email is empty
  userEmail$ = this.userIdSubject.asObservable();
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.Token) {
            // Make sure `token` exists
            localStorage.setItem('jwtToken', response.Token); // Store token
            this.setUserEmail(response.Id);
          } else {
            console.error('⚠️ Login response does not contain a token!');
          }
        }),
        catchError(this.handleError)
      );
  }

  setUserEmail(Id: string): void {
    this.userIdSubject.next(Id);
    localStorage.setItem(this.user_id, JSON.stringify({ Id }));
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    console.log('📥 Retrieved token from storage:', token);
    return token;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('UserId');
  }

  isAuthenticated(): boolean {
    return !!this.getUserEmail();
  }

  getUserEmail(): string {
    const auth = localStorage.getItem(this.user_id);
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      const id = parsedAuth.Id || '';
      this.userIdSubject.next(id); // Update the observable with the current email
      return id;
    }
    return '';
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ API Error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }
}
