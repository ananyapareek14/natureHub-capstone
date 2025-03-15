import { Component, OnInit } from '@angular/core';
import { Cart } from '../../Models/cart.model';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  // cart: Cart = { UserId: '', Items: [] };
  // totalAmount: number = 0;
  // shippingDetails = {
  //   Name: '',
  //   Address: '',
  //   Phone: ''
  // };

  // constructor(
  //   private cartService: CartServiceService,
  //   private orderService: OrderServiceService,
  //   private toastService: ToastService,
  //   private router: Router
  // ) { }

  // ngOnInit(): void {
  //   this.loadCart();
  // }

  // loadCart() {
  //   this.cartService.getCartItems().subscribe({
  //     next: (response: Cart) => {
  //       this.cart = response;
  //       this.totalAmount = this.cart.Items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  //     },
  //     error: () => {
  //       this.toastService.show('Error', 'Failed to load cart. Please try again.', 'error');
  //     }
  //   });
  // }

  // placeOrder() {
  //   if (!this.shippingDetails.Name || !this.shippingDetails.Address || !this.shippingDetails.Phone) {
  //     this.toastService.show('Validation Error', 'Please fill all shipping details.', 'error');
  //     return;
  //   }

  //   const order = {
  //     UserId: this.cart.UserId,
  //     Items: this.cart.Items,
  //     TotalAmount: this.totalAmount,
  //     ShippingDetails: this.shippingDetails
  //   };

  //   this.orderService.createOrder(order).subscribe({
  //     next: () => {
  //       this.toastService.show('Success', 'Order placed successfully!', 'success');
  //       this.cartService.clearCart(); // Clear cart after order
  //       this.router.navigate(['/order-history']);
  //     },
  //     error: () => {
  //       this.toastService.show('Error', 'Failed to place order. Try again later.', 'error');
  //     }
  //   });
  // }
}
