import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Order, OrderStatus } from '../../Models/order.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  // user: any = null;
  // cartItemCount: number = 0;
  // orders: Order[] = [];
  // filteredOrders: Order[] = [];
  // selectedStatuses: OrderStatus[] = [];

  // // Convert enum to array for dropdown display
  // orderStatusOptions = Object.keys(OrderStatus).filter((key) =>
  //   isNaN(Number(key))
  // ) as (keyof typeof OrderStatus)[];

  // isLoading = true;
  // errorMessage: string | null = null;

  // constructor(private userService: UserServiceService) {}

  // ngOnInit() {
  //   this.loadUserData();
  // }

  // loadUserData() {
  //   this.isLoading = true;

  //   this.userService.getUserProfile().subscribe({
  //     next: (profile) => {
  //       this.user = profile;
  //       this.cartItemCount = profile.CartItemCount;

  //       // Convert numeric status to readable enum
  //       this.orders = profile.Orders.map((order) => ({
  //         ...order,
  //         Status: OrderStatus[order.Status], // Converts 0 → "Pending", 1 → "Completed", etc.
  //       }));

  //       this.filteredOrders = [...this.orders]; // Default: Show all orders
  //       this.isLoading = false;
  //     },
  //     error: () => {
  //       this.errorMessage = 'Failed to load user profile.';
  //       this.isLoading = false;
  //     },
  //   });
  // }

  // toggleStatus(status: OrderStatus) {
  //   if (this.selectedStatuses.includes(status)) {
  //     this.selectedStatuses = this.selectedStatuses.filter((s) => s !== status);
  //   } else {
  //     this.selectedStatuses.push(status);
  //   }
  //   this.filterOrders();
  // }

  // filterOrders() {
  //   if (this.selectedStatuses.length === 0) {
  //     this.filteredOrders = [...this.orders]; // Show all orders if no filters are selected
  //   } else {
  //     this.filteredOrders = this.orders.filter((order) =>
  //       this.selectedStatuses.includes(order.Status)
  //     );
  //   }
  // }

  user: any = null;
  cartItemCount: number = 0;
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatuses: OrderStatus[] = [];

  // Convert enum to an array of objects containing keys and numeric values
  orderStatusOptions = Object.entries(OrderStatus)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ key, value: value as OrderStatus }));

  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;

    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.cartItemCount = profile.CartItemCount;

        // Convert numeric status to readable enum
        this.orders = profile.Orders.map((order) => ({
          ...order,
          Status: order.Status as OrderStatus, // Ensure it's typed correctly
        }));

        this.filteredOrders = [...this.orders]; // Default: Show all orders
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load user profile.';
        this.isLoading = false;
      },
    });
  }

  toggleStatus(status: OrderStatus) {
    if (this.selectedStatuses.includes(status)) {
      this.selectedStatuses = this.selectedStatuses.filter((s) => s !== status);
    } else {
      this.selectedStatuses.push(status);
    }
    this.filterOrders();
  }

  filterOrders() {
    if (this.selectedStatuses.length === 0) {
      this.filteredOrders = [...this.orders]; // Show all orders if no filters are selected
    } else {
      this.filteredOrders = this.orders.filter((order) =>
        this.selectedStatuses.includes(order.Status)
      );
    }
  }
}
