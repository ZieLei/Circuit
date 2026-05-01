import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonButton, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductService, CartItem, Product } from '../services/product.service';
import { addIcons } from 'ionicons';
import { trashOutline, cartOutline, star } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonImg, IonButton, IonIcon, IonCheckbox, CommonModule, FormsModule]
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  selectedItems: Set<string> = new Set();

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    addIcons({ trashOutline, cartOutline, star });
  }

  getItemKey(item: CartItem): string {
    return `${item.product.id}-${item.selectedVariant || 'default'}`;
  }

  isItemSelected(item: CartItem): boolean {
    return this.selectedItems.has(this.getItemKey(item));
  }

  toggleItemSelection(item: CartItem): void {
    const key = this.getItemKey(item);
    if (this.selectedItems.has(key)) {
      this.selectedItems.delete(key);
    } else {
      this.selectedItems.add(key);
    }
  }

  isAllSelected(): boolean {
    return this.cartItems.length > 0 && this.cartItems.every(item => this.isItemSelected(item));
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedItems.clear();
    } else {
      this.cartItems.forEach(item => {
        this.selectedItems.add(this.getItemKey(item));
      });
    }
  }

  getSelectedCount(): number {
    return this.selectedItems.size;
  }

  formatNumber(num: number): string {
    if (!num) return '0';
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  getVariantLabel(variant: string): string {
    if (!variant) return 'Option';

    const lowerVariant = variant.toLowerCase();

    // Check for capacity/storage indicators
    if (lowerVariant.includes('gb') || lowerVariant.includes('tb') || lowerVariant.includes('mb')) {
      return 'Capacity';
    }

    // Check for size indicators
    if (lowerVariant.includes('inch') || lowerVariant.match(/^\d+\s*(mm|cm|m|kg|g)$/)) {
      return 'Size';
    }

    // Check for common color names
    const colorKeywords = ['black', 'white', 'gray', 'grey', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'silver', 'gold', 'brown', 'beige', 'navy', 'teal', 'cyan', 'magenta', 'lime', 'indigo', 'violet', 'maroon', 'olive', 'charcoal', 'rose', 'midnight', 'starlight'];
    if (colorKeywords.some(color => lowerVariant.includes(color))) {
      return 'Color';
    }

    return 'Variant';
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
    return this.cartItems
      .filter(item => this.isItemSelected(item))
      .reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product-view'], { queryParams: { id: product.id } });
  }

  checkout(): void {
    const selectedItems = this.cartItems.filter(item => this.isItemSelected(item));
    if (selectedItems.length > 0) {
      // Store selected items for checkout
      this.router.navigate(['/checkout'], {
        queryParams: { fromCart: true, selectedOnly: true }
      });
    } else {
      alert('Please select at least one item to checkout.');
    }
  }

  trashIcon = trashOutline;
  cartIcon = cartOutline;
}