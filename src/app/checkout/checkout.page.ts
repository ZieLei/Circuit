import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, CartItem } from '../services/product.service';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, arrowBackOutline, locationOutline, cardOutline, cashOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonImg, IonButton, IonIcon, CommonModule, FormsModule]
})
export class CheckoutPage implements OnInit {
  cartItems: CartItem[] = [];
  showSuccess = false;
  
  // Payment & Delivery selection
  paymentMethod: string = 'cod';
  deliveryOption: string = 'standard';

  // Saved shipping info (from profile)
  shippingInfo = {
    name: 'Hitori Gotoh',
    phone: '0912345678',
    address: 'c/o STARRY Live House 3-2-1 Shimokitazawa, Setagaya-ku',
    city: 'Tokyo',
    zipCode: '155-0031',
    country: 'Japan'
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ checkmarkCircleOutline, arrowBackOutline, locationOutline, cardOutline, cashOutline, chevronForwardOutline });
  }

  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    // Check if coming from successful checkout
    this.route.queryParams.subscribe(params => {
      if (params['success']) {
        this.showSuccess = true;
      }
    });
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }

  getCartTotal(): number {
    return this.productService.getCartTotal();
  }

  getShippingFee(): number {
    return this.deliveryOption === 'express' ? 100 : 50;
  }

  getOrderTotal(): number {
    return this.getCartTotal() + this.getShippingFee();
  }

  getItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  goBack(): void {
    this.router.navigate(['/tabs/cart']);
  }

  goToEditAddress(): void {
    this.router.navigate(['/edit-profile']);
  }

  selectPayment(method: string): void {
    this.paymentMethod = method;
  }

  selectDelivery(option: string): void {
    this.deliveryOption = option;
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Mock order placement
    const orderData = {
      items: this.cartItems,
      customer: this.shippingInfo,
      paymentMethod: this.paymentMethod,
      deliveryOption: this.deliveryOption,
      subtotal: this.getCartTotal(),
      shipping: this.getShippingFee(),
      total: this.getOrderTotal(),
      date: new Date().toISOString()
    };

    console.log('Order placed:', orderData);

    // Clear cart
    this.productService.clearCart();

    // Show success message
    this.showSuccess = true;

    // Navigate to orders page after a delay
    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 2000);
  }

  checkmarkIcon = checkmarkCircleOutline;
  backIcon = arrowBackOutline;
}