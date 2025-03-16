import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RemedyListComponent } from './Remedy/remedy-list/remedy-list.component';
import { RemedyDetailComponent } from './Remedy/remedy-detail/remedy-detail.component';
import { ProductListComponent } from './Shopping/product-list/product-list.component';
import { ProductDetailComponent } from './Shopping/product-detail/product-detail.component';
import { CartComponent } from './Shopping/cart/cart.component';
import { CheckoutComponent } from './Shopping/checkout/checkout.component';
import { ProfileComponent } from './User/profile/profile.component';
import { HealthTipListComponent } from './Health-Tips/health-tips-list/health-tips-list.component';
import { HealthTipsDetailComponent } from './Health-Tips/health-tips-detail/health-tips-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'remedies', component: RemedyListComponent },
  { path: 'remedies/:id', component: RemedyDetailComponent },
  { path: 'health-tips', component: HealthTipListComponent },
  { path: 'health-tips/:id', component: HealthTipsDetailComponent },
  { path: 'shop', component: ProductListComponent },
  { path: 'shop/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
