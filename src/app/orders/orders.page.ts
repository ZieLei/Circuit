import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonLabel, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  constructor(private router: Router) { }

  selectedCategory = 'all';

  categories = [
    { id: 'all', label: 'All' },
    { id: 'toPay', label: 'To pay' },
    { id: 'toShip', label: 'To ship' },
    { id: 'toReceive', label: 'To receive' },
    { id: 'toReview', label: 'To review' }
  ];

  test_product = [
    {
      name: 'Wireless Gaming Mouse',
      price: 1299,
      category: 'toPay',
      status: 'Pending',
      image: 'assets/images/wireless-gaming-mouse.jpg',
      count: 1
    },
    {
      name: 'AMD Ryzen 7 7800X3D',
      price: 24999,
      category: 'toShip',
      status: 'Packed',
      image: 'assets/images/amdR77800x3d.jpg',
      count: 1
    },
    {
      name: 'SSD 1TB NVMe (Ending Soon)',
      price: 3499,
      category: 'toReceive',
      status: 'Shipped',
      image: 'assets/images/ssd.jpg',
      count: 1
    },
    {
      name: 'Mechanical RGB Keyboard',
      price: 1899,
      category: 'toReview',
      status: 'Completed',
      image: 'assets/images/rgb-kb.jpg',
      count: 1
    }
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'all') {
      return this.test_product;
    }
    return this.test_product.filter((product) => product.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  getSafeCount(count: number | null | undefined): number {
    return Math.max(1, count ?? 1);
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  ngOnInit() {
  }

}