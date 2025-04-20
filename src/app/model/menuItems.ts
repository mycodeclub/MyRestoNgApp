export type MenuItems = MenuItem[];

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  pricing: Pricing[];
  isAvilable: boolean;
  foodItemImg: any;
  foodItemImgUrl?: string;
  categoryId: number;
  category: any;
  ingredients?: string;
  recipe?: string;
  lastUpdate: string;
  createDate: string;
  quantity: number;
};

export interface Pricing {
  id: number;
  foodItemId: number;
  quantityDesciption: string;
  cost: number;
}

//------------------------------

export type CartItem = {
  id: number;
  itemId: number;
  pricingId: number;
  ItemName: string;
  quantity: number;
  unitPrice: number; // Add this field
};

export class Cart {
  cartId: number = 0;
  selectedItems: CartItem[] = [];
  discount: number = 0;

  constructor(cartId: number, items: CartItem[] = [], discount: number = 0) {
    this.cartId = cartId;
    this.selectedItems = items;
    this.discount = discount;
  }

  // Add an item to the cart
  addItem(item: CartItem): void {
    const existingItem = this.selectedItems.find(
      (i) => i.itemId === item.itemId && i.pricingId === item.pricingId
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.selectedItems.push(item);
    }
  }

  // Remove an item from the cart
  removeItem(itemId: number, pricingId: number): void {
    this.selectedItems = this.selectedItems.filter(
      (item) => !(item.itemId === itemId && item.pricingId === pricingId)
    );
  }

  // Update item quantity
  updateQuantity(itemId: number, pricingId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(itemId, pricingId);
      return;
    }

    const item = this.selectedItems.find(
      (i) => i.itemId === itemId && i.pricingId === pricingId
    );
    if (item) {
      item.quantity = newQuantity;
    }
  }

  // Clear the entire cart
  clearCart(): void {
    this.selectedItems = [];
    this.discount = 0;
  }

  // Apply discount
  applyDiscount(amount: number): void {
    if (amount < 0) {
      throw new Error('Discount amount cannot be negative');
    }
    this.discount = amount;
  }

  // Remove discount
  removeDiscount(): void {
    this.discount = 0;
  }

  // Get total number of items in cart
  get itemCount(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.selectedItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  }

  get totalPriceAfterDiscount(): number {
    const total = this.totalPrice;
    return total - this.discount;
  }

  // Check if cart is empty
  get isEmpty(): boolean {
    return this.selectedItems.length === 0;
  }
}
