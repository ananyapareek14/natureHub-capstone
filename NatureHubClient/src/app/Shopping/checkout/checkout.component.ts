import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../Models/cart.model';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartServiceService,
    private orderService: OrderServiceService,
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
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.Product.Price * item.Quantity,
      0
    );
  }

  placeOrder() {
    const confirmOrder = window.confirm(
      'Are you sure you want to place this order?'
    );
    if (!confirmOrder) return;

    // Retrieve the UserId correctly
    const user = localStorage.getItem('UserId');

    if (!user) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    // Parse if UserId is stored as an object
    let userId: string;
    try {
      const parsedUser = JSON.parse(user);
      userId = parsedUser.Id ? parsedUser.Id : parsedUser; // Handle different formats
    } catch {
      userId = user; // If it's already a string, use it directly
    }

    console.log('UserId being sent:', userId);

    // Create order request
    const orderRequest = {
      UserId: userId,
      OrderItems: this.cartItems.map((item) => ({
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        Price: item.Product.Price,
      })),
    };

    console.log('Order Request:', orderRequest);

    this.orderService.placeOrder(orderRequest).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.router.navigate(['/order-history']);
      },
      error: (err) => {
        console.error('Order Placement Error:', err);
        alert('Failed to place order. Please try again.');
      },
    });
  }
}
