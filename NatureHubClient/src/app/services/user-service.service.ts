import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/profile`);
  }

  getUserOverview(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/overview`);
}
}
