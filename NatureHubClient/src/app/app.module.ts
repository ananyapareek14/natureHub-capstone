import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RemedyListComponent } from './Remedy/remedy-list/remedy-list.component';
import { RemedyDetailComponent } from './Remedy/remedy-detail/remedy-detail.component';
import { RemedyCategoryComponent } from './Remedy/remedy-category/remedy-category.component';
import { HealthTipsListComponent } from './Health-Tips/health-tips-list/health-tips-list.component';
import { HealthTipsDetailComponent } from './Health-Tips/health-tips-detail/health-tips-detail.component';
import { HealthTipsCategoryComponent } from './Health-Tips/health-tips-category/health-tips-category.component';
import { ProductListComponent } from './Shopping/product-list/product-list.component';
import { ProductDetailComponent } from './Shopping/product-detail/product-detail.component';
import { CartComponent } from './Shopping/cart/cart.component';
import { CheckoutComponent } from './Shopping/checkout/checkout.component';
import { OrderHistoryComponent } from './Shopping/order-history/order-history.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './User/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './User/login/login.component';
import { ToastComponent } from './shared/toast/toast.component';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './User/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    RemedyListComponent,
    RemedyDetailComponent,
    RemedyCategoryComponent,
    HealthTipsListComponent,
    HealthTipsDetailComponent,
    HealthTipsCategoryComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    SignUpComponent,
    LoginComponent,
    UserDashboardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
