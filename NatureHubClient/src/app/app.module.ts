import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemedyListComponentComponent } from './Remedy/remedy-list-component/remedy-list-component.component';
import { RemedyDetailComponentComponent } from './Remedy/remedy-detail-component/remedy-detail-component.component';
import { RemedyCategoryComponentComponent } from './Remedy/remedy-category-component/remedy-category-component.component';
import { HealthTipsListComponentComponent } from './Health-Tips/health-tips-list-component/health-tips-list-component.component';
import { HealthTipsDetailComponentComponent } from './Health-Tips/health-tips-detail-component/health-tips-detail-component.component';
import { HealthTipsCategoryComponentComponent } from './Health-Tips/health-tips-category-component/health-tips-category-component.component';
import { ProductListComponentComponent } from './Shopping/product-list-component/product-list-component.component';
import { ProductDetailComponentComponent } from './Shopping/product-detail-component/product-detail-component.component';
import { CartComponentComponent } from './Shopping/cart-component/cart-component.component';
import { CheckoutComponentComponent } from './Shopping/checkout-component/checkout-component.component';
import { OrderHistoryComponentComponent } from './Shopping/order-history-component/order-history-component.component';
import { SignUpComponentComponent } from './User/sign-up-component/sign-up-component.component';
import { LoginComponentComponent } from './User/login-component/login-component.component';
import { UserDashboardComponentComponent } from './User/user-dashboard-component/user-dashboard-component.component';
import { ProfileComponentComponent } from './User/profile-component/profile-component.component';
import { NavbarComponentComponent } from './shared/navbar-component/navbar-component.component';
import { FooterComponentComponent } from './shared/footer-component/footer-component.component';
import { SidebarComponentComponent } from './shared/sidebar-component/sidebar-component.component';
import { NotFoundComponentComponent } from './shared/not-found-component/not-found-component.component';
import { LoadingSpinnerComponentComponent } from './shared/loading-spinner-component/loading-spinner-component.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RemedyListComponentComponent,
    RemedyDetailComponentComponent,
    RemedyCategoryComponentComponent,
    HealthTipsListComponentComponent,
    HealthTipsDetailComponentComponent,
    HealthTipsCategoryComponentComponent,
    ProductListComponentComponent,
    ProductDetailComponentComponent,
    CartComponentComponent,
    CheckoutComponentComponent,
    OrderHistoryComponentComponent,
    SignUpComponentComponent,
    LoginComponentComponent,
    UserDashboardComponentComponent,
    ProfileComponentComponent,
    NavbarComponentComponent,
    FooterComponentComponent,
    SidebarComponentComponent,
    NotFoundComponentComponent,
    LoadingSpinnerComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
