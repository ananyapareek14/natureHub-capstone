import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { CartItem, CartPost } from '../Models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number): Observable<CartItem> {
    const user = JSON.parse(localStorage.getItem('UserId') || '{}');
    const userId = user.Id; // Ensure this correctly retrieves the UserId

    if (!userId) {
      console.error('User ID is missing. Ensure the user is logged in.');
      throw new Error('User ID not found in local storage.');
    }

    if (quantity <= 0) {
      console.error('Invalid quantity:', quantity);
      throw new Error('Quantity must be at least 1.');
    }

    const cartItem: CartPost = {
      UserId: userId,
      ProductId: productId,
      Quantity: quantity,
    };

    return this.http.post<CartItem>(`${this.apiUrl}/cart`, cartItem);
  }

  updateCartItem(productId: string, quantity: number): Observable<CartItem> {
    const user = JSON.parse(localStorage.getItem('UserId') || '{}');
    const userId = user.Id;
    
    const cartItem = {
      UserId: userId,
      ProductId: productId,
      Quantity: quantity,
    };
    return this.http.put<CartItem>(`${this.apiUrl}/cart`, cartItem);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
  }

  removeCartItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${itemId}`);
  }
}
