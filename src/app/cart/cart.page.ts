import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductService, CartItem, Product } from '../services/product.service';
import { addIcons } from 'ionicons';
import { trashOutline, cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonImg, IonButton, IonIcon, CommonModule, FormsModule]
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    addIcons({ trashOutline, cartOutline });
  }

  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }

  updateQuantity(item: CartItem, delta: number): void {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      this.productService.removeFromCart(item.product.id, item.selectedVariant);
    } else {
      this.productService.updateCartQuantity(item.product.id, newQuantity, item.selectedVariant);
    }
  }

  removeItem(item: CartItem): void {
    this.productService.removeFromCart(item.product.id, item.selectedVariant);
  }

  getCartTotal(): number {
    return this.productService.getCartTotal();
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product-view'], { queryParams: { id: product.id } });
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }

  trashIcon = trashOutline;
  cartIcon = cartOutline;
}