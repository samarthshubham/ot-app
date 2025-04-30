import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIdentityComponent } from '@ot-app/user-identity';
import { jwtDecode } from 'jwt-decode';
import { InventoryListComponent } from '../../inventory-item/components/inventory-list/inventory-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, UserIdentityComponent, InventoryListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  username = '';

  constructor() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: { username?: string } = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        this.username = decodedToken?.username ?? 'Guest';
      } catch (error) {
        console.warn('Invalid token format:', error);
        this.username = 'Guest';
      }
    } else {
      console.log('No token found');
      this.username = 'Guest';
    }
  }
}
