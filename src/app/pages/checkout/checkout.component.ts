import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Payment options
  paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: 'bi-wallet2' },
    { id: 'qr', name: 'Scan QR Code', icon: 'bi-qr-code' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'bi-cash' }
  ];

  selectedPaymentMethod = 'upi';
  discountCode = '';
  discountApplied = false;
  discountAmount = 0;

  get cart() {
    return this.cartService.cart;
  }

  applyDiscount(): void {
    if (this.discountCode && !this.discountApplied) {
      // Here you would typically validate the discount code with your backend
      // For now, we'll apply a 10% discount as an example
      const discount = this.cart.totalPrice * 0.1;
      this.cartService.applyDiscount(discount);
      this.discountApplied = true;
      this.discountAmount = discount;
    }
  }

  removeDiscount(): void {
    this.cartService.applyDiscount(0);
    this.discountApplied = false;
    this.discountAmount = 0;
    this.discountCode = '';
  }

  placeOrder(): void {
    // Here you would typically:
    // 1. Send order details to your backend
    // 2. Process payment through your payment gateway
    // 3. Show success/error message
    // 4. Clear cart and redirect to order confirmation page

    // For now, we'll just show an alert and clear the cart
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
} 