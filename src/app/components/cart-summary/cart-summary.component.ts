import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/menuItems';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  private cartService = inject(CartService);
  
  get cart() {
    return this.cartService.cart;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.itemId, item.pricingId, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.itemId, item.pricingId, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.itemId, item.pricingId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
} 