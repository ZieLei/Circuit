import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { cubeOutline } from 'ionicons/icons';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  category: 'toPay' | 'toShip' | 'toReceive' | 'toReview' | 'completed';
  status: string;
  statusColor: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonLabel, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ cubeOutline });
  }

  selectedCategory = 'all';

  categories = [
    { id: 'all', label: 'All' },
    { id: 'toPay', label: 'To Pay' },
    { id: 'toShip', label: 'To Ship' },
    { id: 'toReceive', label: 'To Receive' },
    { id: 'toReview', label: 'To Review' },
    { id: 'completed', label: 'Completed' }
  ];

  orders: Order[] = [
    // To Pay Orders
    {
      id: 'ORD-001',
      orderNumber: '240501-ABC123',
      date: '2026-05-01T10:30:00',
      category: 'toPay',
      status: 'Waiting for Payment',
      statusColor: '#FF6400',
      items: [
        { id: '2', name: 'Wireless Gaming Mouse', price: 1299, quantity: 1, image: 'assets/images/wireless-gaming-mouse.jpg', variant: 'Black' }
      ],
      subtotal: 1299,
      shipping: 50,
      total: 1349
    },
    {
      id: 'ORD-002',
      orderNumber: '240430-DEF456',
      date: '2026-04-30T15:20:00',
      category: 'toPay',
      status: 'Payment Pending',
      statusColor: '#FF6400',
      items: [
        { id: '3', name: 'AMD Ryzen 7 7800X3D', price: 24999, quantity: 1, image: 'assets/images/amdR77800x3d.jpg' },
        { id: '6', name: 'Corsair Vengeance 16GB DDR5', price: 3999, quantity: 1, image: 'assets/images/vengence-16gb-ddr5.jpg', variant: '5200MHz' }
      ],
      subtotal: 28998,
      shipping: 0,
      total: 28998
    },
    // To Ship Orders
    {
      id: 'ORD-003',
      orderNumber: '240428-GHI789',
      date: '2026-04-28T09:15:00',
      category: 'toShip',
      status: 'Processing',
      statusColor: '#3b82f6',
      items: [
        { id: '5', name: 'SSD 1TB NVMe', price: 3499, quantity: 1, image: 'assets/images/ssd.jpg', variant: '1TB' }
      ],
      subtotal: 3499,
      shipping: 50,
      total: 3549
    },
    {
      id: 'ORD-004',
      orderNumber: '240425-JKL012',
      date: '2026-04-25T14:45:00',
      category: 'toShip',
      status: 'Ready to Ship',
      statusColor: '#22c55e',
      items: [
        { id: '6', name: 'Corsair Vengeance 16GB DDR5', price: 3999, quantity: 2, image: 'assets/images/vengence-16gb-ddr5.jpg', variant: '5200MHz' }
      ],
      subtotal: 7998,
      shipping: 50,
      total: 8048
    },
    // To Receive Orders
    {
      id: 'ORD-005',
      orderNumber: '240420-MNO345',
      date: '2026-04-20T11:00:00',
      category: 'toReceive',
      status: 'Out for Delivery',
      statusColor: '#8b5cf6',
      items: [
        { id: '7', name: 'Intel Core i5-13600K', price: 17999, quantity: 1, image: 'assets/images/i5-13600K.jpg' },
        { id: '4', name: 'Gaming Headset Pro', price: 2499, quantity: 1, image: 'assets/images/kbm.jpg', variant: 'Black' }
      ],
      subtotal: 20498,
      shipping: 100,
      total: 20598
    },
    {
      id: 'ORD-006',
      orderNumber: '240418-PQR678',
      date: '2026-04-18T16:30:00',
      category: 'toReceive',
      status: 'Shipped',
      statusColor: '#3b82f6',
      items: [
        { id: '1', name: 'Mechanical RGB Keyboard', price: 1899, quantity: 1, image: 'assets/images/rgb-kb.jpg', variant: 'Black' }
      ],
      subtotal: 1899,
      shipping: 50,
      total: 1949
    },
    // To Review Orders
    {
      id: 'ORD-007',
      orderNumber: '240410-STU901',
      date: '2026-04-10T13:20:00',
      category: 'toReview',
      status: 'Delivered',
      statusColor: '#22c55e',
      items: [
        { id: '8', name: 'AMD Ryzen 5 5600X', price: 9999, quantity: 1, image: 'assets/images/r5-5600x.jpg' },
        { id: '2', name: 'Wireless Gaming Mouse', price: 1299, quantity: 1, image: 'assets/images/wireless-gaming-mouse.jpg', variant: 'White' }
      ],
      subtotal: 11298,
      shipping: 100,
      total: 11398
    },
    {
      id: 'ORD-008',
      orderNumber: '240405-VWX234',
      date: '2026-04-05T10:00:00',
      category: 'toReview',
      status: 'Delivered',
      statusColor: '#22c55e',
      items: [
        { id: '5', name: 'SSD 1TB NVMe', price: 3499, quantity: 1, image: 'assets/images/ssd.jpg', variant: '2TB' }
      ],
      subtotal: 3499,
      shipping: 50,
      total: 3549
    },
    // Completed Orders
    {
      id: 'ORD-009',
      orderNumber: '240315-YZ5678',
      date: '2026-03-15T09:45:00',
      category: 'completed',
      status: 'Completed',
      statusColor: '#6b7280',
      items: [
        { id: '4', name: 'Gaming Headset Pro', price: 2499, quantity: 1, image: 'assets/images/kbm.jpg', variant: 'White' },
        { id: '1', name: 'Mechanical RGB Keyboard', price: 1899, quantity: 1, image: 'assets/images/rgb-kb.jpg', variant: 'Gray' }
      ],
      subtotal: 4398,
      shipping: 50,
      total: 4448
    },
    {
      id: 'ORD-010',
      orderNumber: '240228-ABC901',
      date: '2026-02-28T14:20:00',
      category: 'completed',
      status: 'Completed',
      statusColor: '#6b7280',
      items: [
        { id: '7', name: 'Intel Core i5-13600K', price: 17999, quantity: 1, image: 'assets/images/i5-13600K.jpg' }
      ],
      subtotal: 17999,
      shipping: 0,
      total: 17999
    },
    {
      id: 'ORD-011',
      orderNumber: '240210-DEF234',
      date: '2026-02-10T11:30:00',
      category: 'completed',
      status: 'Completed',
      statusColor: '#6b7280',
      items: [
        { id: '3', name: 'AMD Ryzen 7 7800X3D', price: 24999, quantity: 1, image: 'assets/images/amdR77800x3d.jpg' },
        { id: '6', name: 'Corsair Vengeance 16GB DDR5', price: 3999, quantity: 1, image: 'assets/images/vengence-16gb-ddr5.jpg', variant: '5200MHz' },
        { id: '5', name: 'SSD 1TB NVMe', price: 3499, quantity: 1, image: 'assets/images/ssd.jpg', variant: '1TB' }
      ],
      subtotal: 32497,
      shipping: 50,
      total: 32547
    }
  ];

  get filteredOrders(): Order[] {
    if (this.selectedCategory === 'all') {
      return this.orders;
    }
    return this.orders.filter((order) => order.category === this.selectedCategory);
  }

  getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') return this.orders.length;
    return this.orders.filter(o => o.category === categoryId).length;
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getItemCount(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  getPrimaryImage(order: Order): string {
    return order.items[0]?.image || 'assets/images/placeholder.png';
  }

  getOrderActionButton(category: string): { label: string; action: string } {
    switch (category) {
      case 'toPay': return { label: 'Pay Now', action: 'pay' };
      case 'toShip': return { label: 'Track Order', action: 'track' };
      case 'toReceive': return { label: 'Confirm Received', action: 'confirm' };
      case 'toReview': return { label: 'Write Review', action: 'review' };
      case 'completed': return { label: 'Buy Again', action: 'reorder' };
      default: return { label: 'View Details', action: 'view' };
    }
  }

  handleOrderAction(order: Order): void {
    const action = this.getOrderActionButton(order.category);
    console.log(`${action.action} for order ${order.orderNumber}`);

    switch (action.action) {
      case 'pay':
        // Navigate to checkout with order info
        this.router.navigate(['/checkout'], {
          queryParams: {
            orderId: order.id,
            amount: order.total,
            fromOrders: true
          }
        });
        break;
      case 'track':
        // Show tracking info as alert/mock
        this.showTrackingInfo(order);
        break;
      case 'confirm':
        // Mark order as received and move to review category
        this.confirmOrderReceived(order);
        break;
      case 'review':
        // Navigate to first product in order with review modal open
        if (order.items.length > 0) {
          const firstItem = order.items[0];
          this.router.navigate(['/product-view'], {
            queryParams: {
              id: firstItem.id,
              openReview: true
            }
          });
        }
        break;
      case 'reorder':
        // Add all items to cart and navigate to cart
        this.reorderItems(order);
        break;
    }
  }

  showTrackingInfo(order: Order): void {
    const trackingNumber = 'TRK' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const mockLocations = [
      { location: 'Warehouse, Manila', status: 'Order processed', time: '2 days ago' },
      { location: 'Sorting Center, Quezon City', status: 'Package sorted', time: '1 day ago' },
      { location: 'In Transit', status: 'On the way to destination', time: '8 hours ago' },
      { location: 'Local Hub, Makati', status: 'Arrived at delivery hub', time: '2 hours ago' }
    ];

    let trackingHtml = `<strong>Tracking Number:</strong> ${trackingNumber}<br><br>`;
    trackingHtml += '<strong>Tracking History:</strong><br>';
    mockLocations.forEach(loc => {
      trackingHtml += `• ${loc.location} - ${loc.status} (${loc.time})<br>`;
    });

    // Simple alert for now - in a real app this would open a modal
    alert(`Tracking for Order ${order.orderNumber}:\n\n${trackingNumber}\n\nStatus: ${order.status}`);
  }

  confirmOrderReceived(order: Order): void {
    // Move order from toReceive to toReview
    const orderIndex = this.orders.findIndex(o => o.id === order.id);
    if (orderIndex !== -1) {
      this.orders[orderIndex].category = 'toReview';
      this.orders[orderIndex].status = 'Delivered';
      this.orders[orderIndex].statusColor = '#22c55e';
      alert(`Order ${order.orderNumber} confirmed received!\n\nYou can now write a review for your items.`);
    }
  }

  reorderItems(order: Order): void {
    // Mock: Add items to cart
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    alert(`Added ${itemCount} item(s) from order ${order.orderNumber} to your cart!`);
    // Navigate to cart
    this.router.navigate(['/tabs/cart']);
  }

  viewOrderDetails(order: Order): void {
    console.log('View order details:', order);
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  ngOnInit() {
    // Check for category query parameter
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category && this.categories.some(c => c.id === category)) {
        this.selectedCategory = category;
      }
    });
  }

}