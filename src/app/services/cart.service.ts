import { Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../model/menuItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = signal<Cart>(new Cart(1));
  
  get cart() {
    return this._cart();
  }

  addToCart(item: CartItem): void {
    const currentCart = this._cart();
    currentCart.addItem(item);
    this._cart.set(currentCart);
  }

  removeFromCart(itemId: number, pricingId: number): void {
    const currentCart = this._cart();
    currentCart.removeItem(itemId, pricingId);
    this._cart.set(currentCart);
  }

  updateQuantity(itemId: number, pricingId: number, quantity: number): void {
    const currentCart = this._cart();
    currentCart.updateQuantity(itemId, pricingId, quantity);
    this._cart.set(currentCart);
  }

  clearCart(): void {
    const currentCart = this._cart();
    currentCart.clearCart();
    this._cart.set(currentCart);
  }

  applyDiscount(amount: number): void {
    const currentCart = this._cart();
    currentCart.applyDiscount(amount);
    this._cart.set(currentCart);
  }
} 