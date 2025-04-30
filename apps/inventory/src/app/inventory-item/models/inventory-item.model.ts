export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: string;
  quantity: number;
  unitPrice: number;
  minimumQuantity: number;
  expiryDate?: Date;
  categoryId: string;
  categoryName?: string; // Optional for display purposes
  supplierId: string;
  supplierName?: string; // Optional for display purposes
  serialNumber?: string;
  location: string;
  status: 'Available' | 'Low Stock' | 'Out of Stock' | 'Expired';
  isConsumable: boolean;
}
