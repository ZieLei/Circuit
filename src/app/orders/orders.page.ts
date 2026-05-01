import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonLabel, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  constructor() { }

    test_product = [
    { 
      name: 'Mechanical RGB Keyboard;askdkaskld asdkanlsd akjdsak dsha sdhaljs hdkaj shdkjah sdkajhsd', 
      price: 1899, 
      category: 'explore', 
      row: 'Trending',
      sales: 4500,
      rating: 4.6,
      reviews: 12700,
      image: 'assets/images/rgb-kb.jpg',
      count: 1
    }
  ]

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }


  ngOnInit() {
  }

}
