import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { CartItem } from '../Models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number): Observable<void> {
    const cartItem = {
      UserId: localStorage.getItem('Id'),
      ProductId: productId,
      Quantity: quantity,
    };
    return this.http.post<void>(`${this.apiUrl}/cart`, cartItem);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart/${localStorage.getItem('Id')}`);
  }

  removeCartItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${itemId}`);
  }
}
