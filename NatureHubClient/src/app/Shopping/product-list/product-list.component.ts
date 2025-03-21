import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product.model-LAPTOP-EBHCIP1Q';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
// export class ProductListComponent {
//   products: Product[] = [];
//   isLoading = false;

//   constructor(
//     private productService: ProductServiceService,
//     private cartService: CartServiceService,
//     private toastService: ToastService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.isLoading = true;
//     this.productService.getProducts().subscribe({
//       next: (data) => {
//         this.products = data;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.toastService.showError('Failed to load products.');
//         this.isLoading = false;
//       },
//     });
//   }

//   viewProduct(productId: string): void {
//     this.router.navigate(['/shop', productId]);
//   }

//   addToCart(product: Product): void {
//     if (!this.authService.isAuthenticated()) {
//       this.toastService.showError(
//         'You need to log in to add items to the cart!'
//       );
//       this.router.navigate(['/login']);
//       return;
//     }
//     this.cartService.addToCart(product.Id, 1).subscribe({
//       next: () => {
//         this.toastService.showSuccess('Product added to cart');
//       },
//       error: (err) => {
//         this.toastService.showError('Failed to add product to cart');
//       },
//     });
//   }
// }

// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   categories: string[] = [
//     'Skin Care',
//     'Beverages',
//     'Superfoods',
//     'Supplements',
//     'Food & Nutrition',
//     'Sustainable Living',
//     'Essential Oils',
//     'Personal Care',
//   ];
//   isLoading = false;

//   constructor(
//     private productService: ProductServiceService,
//     private cartService: CartServiceService,
//     private toastService: ToastService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.isLoading = true;
//     this.productService.getProducts().subscribe({
//       next: (data) => {
//         this.products = data;
//         this.filteredProducts = data; // Default: Show all products
//         this.isLoading = false;
//       },
//       error: () => {
//         this.toastService.showError('Failed to load products.');
//         this.isLoading = false;
//       },
//     });
//   }

//   filterByCategory(category: string): void {
//     this.filteredProducts = this.products.filter(
//       (product) => product.Category === category
//     );
//   }

//   viewProduct(productId: string): void {
//     this.router.navigate(['/shop', productId]);
//   }

//   addToCart(product: Product): void {
//     if (!this.authService.isAuthenticated()) {
//       this.toastService.showError(
//         'You need to log in to add items to the cart!'
//       );
//       this.router.navigate(['/login']);
//       return;
//     }

//     this.cartService.addToCart(product.Id, 1).subscribe({
//       next: () => this.toastService.showSuccess('Product added to cart'),
//       error: () => this.toastService.showError('Failed to add product to cart'),
//     });
//   }
// }
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = false;

  categories = [
    {
      name: 'Skin Care',
      image:
        'https://www.bodytales.in/cdn/shop/products/Combo-5-Hydtrating-_Glowing-Skin-Care-Combo_Post.jpg?v=1678090122',
    },
    {
      name: 'Beverages',
      image: 'https://www.sas.am/upload/iblock/919/5-removebg-preview.png',
    },
    {
      name: 'Superfoods',
      image:
        'https://ik.imagekit.io/munchery/blog/tr:w-768/what-are-superfoods-why-eat-superfoods.jpeg',
    },
    {
      name: 'Supplements',
      image:
        'https://domf5oio6qrcr.cloudfront.net/medialibrary/4218/herbs-supplements-vitamins.png',
    },
    {
      name: 'Food & Nutrition',
      image:
        'https://cdn.viva.org.uk/wp-content/uploads/2020/08/natural-diet.jpg',
    },
    {
      name: 'Sustainable Living',
      image:
        'https://cdn.prod.website-files.com/63ff7c6ecc83f9ec7ffe916b/67103d8084525c8a632a5cb3_663e61f0badefabc0ce64961_sustainableproducts-ezgif.com-png-to-webp-converter.webp',
    },
    {
      name: 'Essential Oils',
      image:
        'https://5.imimg.com/data5/SELLER/Default/2022/11/LZ/AS/GD/146257157/thymol-oil-500x500.jpg',
    },
    {
      name: 'Personal Care',
      image:
        'https://shop.globalbees.com/cdn/shop/articles/Safe_and_Natural_Personal_Care_Products.jpg?v=1673811279',
    },
  ];

  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private toastService: ToastService,
    private authService: AuthService,
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
        this.filteredProducts = data; // Show all products by default
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showError('Failed to load products.');
        this.isLoading = false;
      },
    });
  }

  filterByCategory(categoryName: string): void {
    this.filteredProducts = this.products.filter(
      (product) => product.Category === categoryName
    );
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/shop', productId]);
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.showError(
        'You need to log in to add items to the cart!'
      );
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product.Id, 1).subscribe({
      next: () => this.toastService.showSuccess('Product added to cart'),
      error: () => this.toastService.showError('Failed to add product to cart'),
    });
  }
}


