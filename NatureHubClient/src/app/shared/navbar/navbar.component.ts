import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  isSticky: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartServiceService,
    private router: Router
  ) {
    // if (this.isLoggedIn()) {
    //   this.userName = this.authService.getUserName();
    // }
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      // this.userName = this.authService.getUserEmail();
      this.updateCartCount();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateCartCount(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    this.isSticky = scrollY > window.innerHeight * 0.4; // 40% of page height
  }
}
