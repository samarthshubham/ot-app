import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = '/api/inventory';

  constructor(private http: HttpClient) {}

  getInventoryItems(): Observable<InventoryItem[]> {
    // For initial development, use mock data
    // In production, replace with actual API call:
    // return this.http.get<InventoryItem[]>(this.apiUrl);

    return of(this.getMockInventoryItems());
  }

  private getMockInventoryItems(): InventoryItem[] {
    return [
      {
        id: '1',
        name: 'Ventilator',
        description: 'ICU grade ventilator for respiratory support',
        type: 'Equipment',
        quantity: 5,
        unitPrice: 10000,
        minimumQuantity: 2,
        categoryId: '1',
        categoryName: 'Medical Equipment',
        supplierId: '1',
        supplierName: 'MedEquip Supplies',
        serialNumber: 'VNT-2023-001',
        location: 'Equipment Room A',
        status: 'Available',
        isConsumable: false,
      },
      {
        id: '2',
        name: 'Surgical Scalpel',
        description: 'Stainless steel surgical scalpel',
        type: 'Instrument',
        quantity: 50,
        unitPrice: 45.99,
        minimumQuantity: 20,
        categoryId: '2',
        categoryName: 'Surgical Instruments',
        supplierId: '1',
        supplierName: 'MedEquip Supplies',
        location: 'Surgical Tools Cabinet',
        status: 'Available',
        isConsumable: false,
      },
      {
        id: '3',
        name: 'Surgical Gloves',
        description: 'Sterile latex surgical gloves',
        type: 'Disposable',
        quantity: 1000,
        unitPrice: 0.75,
        minimumQuantity: 200,
        expiryDate: new Date('2025-12-31'),
        categoryId: '3',
        categoryName: 'Disposables',
        supplierId: '1',
        supplierName: 'MedEquip Supplies',
        location: 'Disposables Storage',
        status: 'Available',
        isConsumable: true,
      },
      {
        id: '4',
        name: 'Broad Spectrum Antibiotics',
        description: 'Injectable antibiotics for surgery',
        type: 'Medicine',
        quantity: 30,
        unitPrice: 25.5,
        minimumQuantity: 30,
        expiryDate: new Date('2026-06-30'),
        categoryId: '4',
        categoryName: 'Medicines',
        supplierId: '2',
        supplierName: 'PharmaPlus Ltd',
        location: 'Medicine Cabinet',
        status: 'Low Stock',
        isConsumable: true,
      },
      {
        id: '5',
        name: 'Surgical Sutures',
        description: 'Absorbable surgical sutures',
        type: 'Disposable',
        quantity: 50,
        unitPrice: 10.25,
        minimumQuantity: 50,
        expiryDate: new Date('2026-02-28'),
        categoryId: '3',
        categoryName: 'Disposables',
        supplierId: '1',
        supplierName: 'MedEquip Supplies',
        location: 'Disposables Storage',
        status: 'Low Stock',
        isConsumable: true,
      },
    ];
  }
}
