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

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe({
      next: (newItem) => {
        const existingItem = this.cartItems.find(
          (item) => item.ProductId === productId
        );
        if (existingItem) {
          existingItem.Quantity += quantity; // Update quantity locally
        } else {
          this.cartItems.push(newItem); // Add new item to the list
        }
        this.calculateTotal();
        this.toastService.showSuccess('Item added to cart');
      },
      error: () => this.toastService.showError('Failed to add item to cart'),
    });
  }

  // loadCart() {
  //   this.cartService.getCartItems().subscribe({
  //     next: (items) => {
  //       this.cartItems = items;
  //       this.calculateTotal();
  //     },
  //     error: () => this.toastService.showError('Failed to load cart items'),
  //   });
  // }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        // this.cartItems = items.map((item) => ({
        //   Id: item.Id,
        //   ProductId: item.ProductId,
        //   ProductName: item.Product?.Name, // Extract from nested object
        //   Price: item.Product?.Price, // Extract from nested object
        //   Quantity: item.Quantity,
        // }));
        this.cartItems = items.map((item) => ({
          Id: item.Id,
          ProductId: item.ProductId,
          Product: item.Product, // Include the entire Product object
          Quantity: item.Quantity,
        }));
        this.calculateTotal();
      },
      error: (err) => console.error('Error fetching cart:', err),
    });
  }

  removeFromCart(cartItemId: string) {
    this.cartService.removeCartItem(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(
          (item) => item.Id !== cartItemId
        );
        this.calculateTotal();
        this.toastService.showSuccess('Item removed from cart');
      },
      error: () => this.toastService.showError('Failed to remove item'),
    });
  }

  // updateQuantity(productId: string, newQuantity: number) {
  //   this.cartService.updateCartItem(productId, newQuantity).subscribe({
  //     next: (updatedItem) => {
  //       const item = this.cartItems.find(
  //         (ci) => ci.ProductId === updatedItem.ProductId
  //       );
  //       if (item) {
  //         item.Quantity = updatedItem.Quantity; // Update quantity locally
  //       }
  //       this.calculateTotal();
  //       this.toastService.showSuccess('Cart updated successfully');
  //     },
  //     error: () => this.toastService.showError('Failed to update cart'),
  //   });
  // }

  // updateQuantity(item: CartItem, change: number) {
  //   const newQuantity = item.Quantity + change;

  //   if (newQuantity < 1) return; // Prevent quantity from going below 1

  //   this.cartService.updateCartItem(item.ProductId, newQuantity).subscribe({
  //     next: (updatedItem) => {
  //       item.Quantity = updatedItem.Quantity; // Update UI immediately
  //       this.calculateTotal();
  //       this.toastService.showSuccess('Cart updated successfully');
  //     },
  //     error: () => this.toastService.showError('Failed to update cart'),
  //   });
  // }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.Quantity + change;
    if (newQuantity < 1) return; // Prevent going below 1

    const previousQuantity = item.Quantity; // Store old quantity for rollback
    item.Quantity = newQuantity; // ✅ Update UI immediately

    this.cartService.updateCartItem(item.ProductId, newQuantity).subscribe({
      next: () => {
        this.calculateTotal(); // ✅ Recalculate total after API success
      },
      error: () => {
        item.Quantity = previousQuantity; // ❌ Rollback on error
        console.error('Failed to update cart');
      },
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.Product.Price * item.Quantity,
      0
    );
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
