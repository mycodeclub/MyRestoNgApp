import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../model/menuItems';
import { CartService } from '../../services/cart.service';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, CartSummaryComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  _menuService = inject(MenuService);
  _cartService = inject(CartService);
  _menuItems = signal<Array<MenuItem>>([]);
  selectedQuantities: { [key: number]: number } = {};
  selectedPricing: { [key: number]: number } = {};

  ngOnInit(): void {
    this._menuService
      .getMenuItemsFromApi()
      .subscribe((data) => {
        this._menuItems.set(data);
        // Initialize quantities and pricing selections
        data.forEach(item => {
          this.selectedQuantities[item.id] = 0;
          if (item.pricing && item.pricing.length > 0) {
            this.selectedPricing[item.id] = item.pricing[0].id;
          }
        });
      });
  }

  updateQuantity(item: MenuItem, change: number): void {
    const newQuantity = (this.selectedQuantities[item.id] || 0) + change;
    const oldQuantity = this.selectedQuantities[item.id];
    
    if (newQuantity >= 0) {
      this.selectedQuantities[item.id] = newQuantity;
      
      // If quantity changed from 0 to 1, add to cart
      if (oldQuantity === 0 && newQuantity === 1) {
        this.addToCart(item);
      }
      // If quantity changed to 0, remove from cart
      else if (newQuantity === 0 && oldQuantity > 0) {
        this.removeFromCart(item);
      }
      // If quantity changed and item is in cart, update quantity
      else if (oldQuantity > 0) {
        this.updateCartQuantity(item);
      }
    }
  }

  private addToCart(item: MenuItem): void {
    if (this.selectedPricing[item.id]) {
      const selectedPrice = item.pricing.find(p => p.id === this.selectedPricing[item.id]);
      if (selectedPrice) {
        const cartItem = {
          id: Date.now(),
          itemId: item.id,
          pricingId: selectedPrice.id,
          ItemName: item.name,
          quantity: 1,
          unitPrice: selectedPrice.cost
        };
        this._cartService.addToCart(cartItem);
      }
    }
  }

  private removeFromCart(item: MenuItem): void {
    if (this.selectedPricing[item.id]) {
      this._cartService.removeFromCart(item.id, this.selectedPricing[item.id]);
    }
  }

  private updateCartQuantity(item: MenuItem): void {
    if (this.selectedPricing[item.id]) {
      this._cartService.updateQuantity(
        item.id,
        this.selectedPricing[item.id],
        this.selectedQuantities[item.id]
      );
    }
  }
}

