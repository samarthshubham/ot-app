import { Routes } from '@angular/router';
import { LoginComponent } from '@ot-demo/libs/login';
import { SignupComponent } from '@ot-demo/libs/signup';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
];
