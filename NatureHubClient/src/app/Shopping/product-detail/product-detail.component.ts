import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product.model-LAPTOP-EBHCIP1Q';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (product) => this.product = product,
      error: () => this.toastService.showError('Failed to load product details')
    });
  }

  // addToCart() {
  //   if (this.quantity < 1) {
  //     this.toastService.showError('Please select a valid quantity');
  //     return;
  //   }

  //   this.cartService.addToCart(this.product.Id, this.quantity).subscribe({
  //     next: () => this.toastService.showSuccess(`${this.product.Name} added to cart!`),
  //     error: () => this.toastService.showError('Failed to add product to cart')
  //   });
  // }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      this.toastService.showError('You need to log in to add items to the cart!');
      this.router.navigate(['/login']); // Redirect to login
      return;
    }
  
    if (this.quantity < 1) {
      this.toastService.showError('Please select a valid quantity');
      return;
    }
  
    this.cartService.addToCart(this.product.Id, this.quantity).subscribe({
      next: () => this.toastService.showSuccess(`${this.product.Name} added to cart!`),
      error: () => this.toastService.showError('Failed to add product to cart'),
    });
}
}
