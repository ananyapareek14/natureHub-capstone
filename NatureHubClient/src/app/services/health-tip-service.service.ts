import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { HealthTip } from '../Models/heal-tip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthTipServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllTips(): Observable<HealthTip[]> {
    return this.http.get<HealthTip[]>(`${this.apiUrl}/HealthTips`);
  }

  getTipById(id: number): Observable<HealthTip> {
    return this.http.get<HealthTip>(`${this.apiUrl}/HealthTips/${id}`);
  }
}
