import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RemedyListComponent } from './Remedy/remedy-list/remedy-list.component';
import { RemedyDetailComponent } from './Remedy/remedy-detail/remedy-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'remedies', component: RemedyListComponent },
  { path: 'remedies/:id', component: RemedyDetailComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
