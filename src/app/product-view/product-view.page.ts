import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

interface Specification {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  sales: number;
  description: string;
  variants?: string[];
  specifications?: Specification[];
}

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonImg, CommonModule, FormsModule]
})
export class ProductViewPage implements OnInit {
  quantity: number = 1;
  selectedVariant: string = '';
  isWishlisted: boolean = false;

  // Sample product data - in a real app, this would come from a route parameter or service
  product: Product = {
    id: 1,
    name: 'Mechanical RGB Keyboard',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: 'assets/images/rgb-kb.jpg',
    rating: 4.6,
    reviews: 12700,
    sales: 4500,
    description: 'Experience ultimate gaming performance with our Mechanical RGB Keyboard. Featuring premium mechanical switches for tactile feedback and responsive keystrokes, customizable per-key RGB lighting with multiple effects, durable aluminum frame construction, anti-ghosting technology with N-key rollover, detachable USB-C cable for easy portability, and dedicated media controls. Perfect for both gaming and productivity.',
    variants: ['Black', 'White', 'Gray'],
    specifications: [
      { label: 'Switch Type', value: 'Mechanical Blue' },
      { label: 'Connectivity', value: 'Wired USB-C' },
      { label: 'Key Rollover', value: 'N-Key (NKRO)' },
      { label: 'Lighting', value: 'Per-key RGB' },
      { label: 'Material', value: 'Aluminum Frame' },
      { label: 'Cable Length', value: '1.8m Braided' },
      { label: 'Dimensions', value: '440 x 135 x 40mm' },
      { label: 'Weight', value: '980g' }
    ]
  };

  // Related products
  relatedProducts: Product[] = [
    {
      id: 2,
      name: 'Wireless Gaming Mouse',
      price: 1299,
      image: 'assets/images/wireless-gaming-mouse.jpg',
      rating: 4.7,
      reviews: 23400,
      sales: 8900,
      description: 'High-precision wireless gaming mouse.'
    },
    {
      id: 3,
      name: 'Gaming Headset',
      price: 2499,
      image: 'assets/images/kbm.jpg',
      rating: 4.8,
      reviews: 8900,
      sales: 3200,
      description: 'Immersive gaming audio experience.'
    },
    {
      id: 4,
      name: 'RGB Mouse Pad',
      price: 899,
      image: 'assets/images/rgb-kb.jpg',
      rating: 4.5,
      reviews: 5600,
      sales: 6700,
      description: 'Large RGB gaming mouse pad.'
    },
    {
      id: 5,
      name: 'USB-C Hub 7-in-1',
      price: 899,
      image: 'assets/images/USB-C Hub 7-in-1.jpg',
      rating: 4.5,
      reviews: 5600,
      sales: 3400,
      description: 'Versatile connectivity hub.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Set default variant if available
    if (this.product.variants && this.product.variants.length > 0) {
      this.selectedVariant = this.product.variants[0];
    }
  }

  goBack(): void {
    this.router.navigate(['/tabs/home']);
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
    // In a real app, this would call a service to update the wishlist
    console.log(this.isWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
  }

  increaseQuantity(): void {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    // In a real app, this would call a cart service
    console.log('Added to cart:', {
      product: this.product,
      quantity: this.quantity,
      variant: this.selectedVariant
    });
    
    // Navigate to cart page
    this.router.navigate(['/tabs/cart']);
  }

  buyNow(): void {
    // In a real app, this would initiate checkout
    console.log('Buy now:', {
      product: this.product,
      quantity: this.quantity,
      variant: this.selectedVariant
    });
    
    // Navigate to cart page for checkout
    this.router.navigate(['/tabs/cart']);
  }

  viewProduct(relatedProduct: Product): void {
    // Navigate to the related product page
    this.router.navigate(['/product-view'], { 
      queryParams: { id: relatedProduct.id }
    });
    
    // In a real app, you would reload the product data based on the new ID
    // For now, we'll just scroll to top
    window.scrollTo(0, 0);
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString('en-PH');
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
}