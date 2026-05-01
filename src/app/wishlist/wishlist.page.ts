import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { addIcons } from 'ionicons';
import { trashOutline, cartOutline, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonLabel,
    IonImg,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class WishlistPage implements OnInit {
  wishlistItems: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {
    addIcons({ heartOutline, cartOutline, trashOutline, heart });
  }

  ngOnInit() {
    this.productService.wishlistItems$.subscribe((items) => {
      this.wishlistItems = items;
    });
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }

  removeItem(product: Product): void {
    this.productService.removeFromWishlist(product.id);
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product, 1);
    this.router.navigate(['/tabs/cart']);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product-view'], {
      queryParams: { id: product.id },
    });
  }

  trashIcon = trashOutline;
  cartIcon = cartOutline;
}
