import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];

  constructor(private readonly inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventoryItems();
  }

  loadInventoryItems(): void {
    this.inventoryService.getInventoryItems().subscribe({
      next: (items) => {
        this.inventoryItems = items;
      },
      error: (error) => {
        console.error('Error fetching inventory items:', error);
      },
    });
  }

  getStatusClass(item: InventoryItem): string {
    switch (item.status) {
      case 'Available':
        return 'available';
      case 'Low Stock':
        return 'low-stock';
      case 'Out of Stock':
        return 'out-of-stock';
      case 'Expired':
        return 'expired';
      default:
        return '';
    }
  }
}
