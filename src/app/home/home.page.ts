import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonChip, IonImg } from '@ionic/angular/standalone';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonChip, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonImg],
})
export class HomePage implements OnInit {
  selectedTab: string = 'explore';
  products: Product[] = [];

  tabs = [
    { id: "explore", label: "Explore" },
    { id: "onSale", label: "On Sale" },
    { id: "processors", label: "CPU" },
    { id: "memory", label: "RAM" },
    { id: "keyboards", label: "Keyboards" },
    { id: "mice", label: "Mice" },
    { id: "audio", label: "Audio" },
    { id: "accessories", label: "Accessories" }
  ];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

  setTab(tabId: string) {
    this.selectedTab = tabId;
  }

  getFilteredProducts(): Product[] {
    switch (this.selectedTab) {
      case 'onSale':
        return this.productService.getDealsProducts(12);
      case 'explore':
        return this.productService.getFeaturedProducts(12);
      default:
        return this.productService.getProductsByCategory(this.selectedTab);
    }
  }

  getCurrentTabLabel(): string {
    if (this.selectedTab === 'onSale') return 'Best Deals';
    if (this.selectedTab === 'explore') return 'Featured Products';
    const tab = this.tabs.find(t => t.id === this.selectedTab);
    return tab ? tab.label : '';
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-view'], { queryParams: { id: product.id } });
  }

  formatNumber(num: number): string {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }
}