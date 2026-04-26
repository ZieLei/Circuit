import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonSegmentButton, IonChip, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonChip, IonSegmentButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonImg],
})
export class HomePage {
  selectedTab: string = 'explore';

  items = [
  { 
    name: 'AMD Ryzen 7 7800X3D', 
    price: 24999,
    category: 'cpu', 
    row: 'Top Performance',
    sales: 1240,
    rating: 4.9,
    reviews: 15230,
    image: 'assets/images/amdR77800x3d.jpg'
  },
  { 
    name: 'Intel Core i9-14900K', 
    price: 28999, 
    category: 'cpu', 
    row: 'Top Performance',
    sales: 890,
    rating: 4.8,
    reviews: 9800,
    image: 'assets/images/i9-14900K.jpg'
  },
  { 
    name: 'AMD Ryzen 5 5600X', 
    price: 8999, 
    category: 'cpu', 
    row: 'Budget',
    sales: 3450,
    rating: 4.7,
    reviews: 28450,
    image: 'assets/images/r5-5600x.jpg'
  },
  { 
    name: 'Intel Core i5-13600K', 
    price: 15999, 
    category: 'cpu', 
    row: 'Latest Gen',
    sales: 2100,
    rating: 4.8,
    reviews: 12300,
    image: 'assets/images/i5-13600K.jpg'
  },
  { 
    name: 'Corsair Vengeance 16GB DDR5', 
    price: 5499, 
    category: 'ram', 
    row: 'DDR5',
    sales: 3100,
    rating: 4.9,
    reviews: 8900,
    image: 'assets/images/vengence-16gb-ddr5.jpg'
  },
  { 
    name: 'Kingston Fury 32GB DDR4', 
    price: 4999, 
    category: 'ram', 
    row: 'DDR4',
    sales: 2750,
    rating: 4.7,
    reviews: 15400,
    image: 'assets/images/kingston-16gb-ddr4.jpg'
  },
  { 
    name: 'G.Skill Trident Z RGB 16GB', 
    price: 6299, 
    category: 'ram', 
    row: 'Low Latency',
    sales: 980,
    rating: 4.8,
    reviews: 4300,
    image: 'assets/images/Trident 16GB.jpg'
  },
  { 
    name: 'TeamGroup Elite 8GB DDR4', 
    price: 1999, 
    category: 'ram', 
    row: 'Budget',
    sales: 5200,
    rating: 4.5,
    reviews: 27800,
    image: 'assets/images/t-group-8gb-ddr4.jpg'
  },
  { 
    name: 'Mechanical RGB Keyboard', 
    price: 1899, 
    category: 'explore', 
    row: 'Trending',
    sales: 4500,
    rating: 4.6,
    reviews: 12700,
    image: 'assets/images/rgb-kb.jpg'
  },
    { 
    name: 'Mechanical RGB Keyboard', 
    price: 1899, 
    category: 'explore', 
    row: 'Trending',
    sales: 4500,
    rating: 4.6,
    reviews: 12700,
    image: 'assets/images/rgb-kb.jpg'
  },
    { 
    name: 'Mechanical RGB Keyboard', 
    price: 1899, 
    category: 'explore', 
    row: 'Trending',
    sales: 4500,
    rating: 4.6,
    reviews: 12700,
    image: 'assets/images/rgb-kb.jpg'
  },
    { 
    name: 'Mechanical RGB Keyboard', 
    price: 1899, 
    category: 'explore', 
    row: 'Trending',
    sales: 4500,
    rating: 4.6,
    reviews: 12700,
    image: 'assets/images/rgb-kb.jpg'
  },
  { 
    name: 'Wireless Gaming Mouse', 
    price: 1299, 
    category: 'explore', 
    row: 'Popular',
    sales: 8900,
    rating: 4.7,
    reviews: 23400,
    image: 'assets/images/wireless-gaming-mouse.jpg'
  },
  { 
    name: 'USB-C Hub 7-in-1', 
    price: 899, 
    category: 'explore', 
    row: 'New',
    sales: 3400,
    rating: 4.5,
    reviews: 5600,
    image: 'assets/images/USB-C Hub 7-in-1.jpg'  
  },
  { 
    name: 'Laptop Cooling Pad', 
    price: 1599, 
    category: 'explore', 
    row: 'Editor Picks',
    sales: 2100,
    rating: 4.8,
    reviews: 8900,
    image: 'assets/images/laptop cooling pad.jpg'  
  },
  { 
    name: 'Gaming Chair (On Sale)', 
    price: 4999, 
    category: 'onSale', 
    row: 'Biggest Discounts',
    sales: 890,
    rating: 4.6,
    reviews: 4500,
    image: 'assets/images/gaming chair.jpg' 
  },
  { 
    name: 'SSD 1TB NVMe (Ending Soon)', 
    price: 3499, 
    category: 'onSale', 
    row: 'Ending Soon',
    sales: 2340,
    rating: 4.8,
    reviews: 12300,
    image: 'assets/images/ssd.jpg'  
  },
  { 
    name: 'Headset + Mouse Bundle', 
    price: 2499, 
    category: 'onSale', 
    row: 'Bundles',
    sales: 1870,
    rating: 4.7,
    reviews: 7800,
    image: 'assets/images/kbm.jpg'  
  }
];

  tabs = [
    {
      id: "explore",
      label: "Explore",
      rows: ["Trending", "Popular", "New", "Editor Picks"]
    },   
    {
      id: "onSale",
      label: "On Sale",
      rows: ["Biggest Discounts", "Ending Soon", "Bundles"]
    },
    {
      id: "cpu",
      label: "CPU",
      rows: ["Top Performance", "Budget", "Latest Gen"]
    },
    {
      id: "ram",
      label: "RAM",
      rows: ["DDR5", "DDR4", "Low Latency", "Budget"]
    },
    {
      id: "anime",
      label: "Anime",
      rows: ["Featured", "New Drops", "Fan Favorites"]
    }
  ]

  setTab(tabId: string) {
    this.selectedTab = tabId;
  }

  getFilteredItems(row: string) {
    return this.items.filter(item => item.category === this.selectedTab && item.row === row);
  }

  getRows(tabId: string) {
    const tab = this.tabs.find(tab => tab.id === tabId);
    return tab ? tab.rows : [];
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

  constructor() {}
}
