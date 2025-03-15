import { Component } from '@angular/core';
import { Product } from '../../Models/product.model-LAPTOP-EBHCIP1Q';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  isLoading = false;

  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showError('Failed to load products.');
        this.isLoading = false;
      },
    });
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/shop', productId]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.Id, 1).subscribe({
      next: () => this.toastService.showSuccess('Product added to cart'),
      error: () => this.toastService.showError('Failed to add product to cart'),
    });
  }
}
