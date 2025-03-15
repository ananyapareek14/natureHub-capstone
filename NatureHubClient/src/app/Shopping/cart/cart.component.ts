import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../Models/cart.model';
import { CartServiceService } from '../../services/cart-service.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartServiceService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: () => this.toastService.showError('Failed to load cart items'),
    });
  }

  removeFromCart(itemId: string) {
    this.cartService.removeCartItem(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.Id !== itemId);
        this.calculateTotal();
        this.toastService.showSuccess('Item removed from cart');
      },
      error: () => this.toastService.showError('Failed to remove item'),
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
    );
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
