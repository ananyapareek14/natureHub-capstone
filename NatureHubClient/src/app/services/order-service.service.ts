import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  placeOrder(orderRequest: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/place-order`, orderRequest);
  }
}
