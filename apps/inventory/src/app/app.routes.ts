import { Route } from '@angular/router';
import { LoginComponent } from '@ot-demo/libs/login';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  // You can add more routes as needed
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
