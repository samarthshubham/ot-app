import { Route } from '@angular/router';
import { LoginComponent } from '@ot-demo/libs/login';
import { SignupComponent } from '@ot-demo/libs/signup';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  // You can add more routes as needed
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
