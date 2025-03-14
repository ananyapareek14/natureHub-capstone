import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Remedy } from '../Models/remedies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemedyServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRemedies(): Observable<Remedy[]> {
    return this.http.get<Remedy[]>(`${this.apiUrl}/Remedies`);
  }

  getRemedyById(id: number): Observable<Remedy> {
    return this.http.get<Remedy>(`${this.apiUrl}/Remedies/${id}`);
  }
}
