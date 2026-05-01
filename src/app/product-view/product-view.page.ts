import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonIcon, IonButton, IonTextarea, IonModal } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { addIcons } from 'ionicons';
import { starOutline, cartOutline, heartOutline, heart, arrowBackOutline, shareOutline, star, personCircleOutline, thumbsUpOutline, chatbubbleOutline, shieldCheckmarkOutline } from 'ionicons/icons';

interface Review {
  id: string;
  reviewerName: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  images?: string[];
  verified: boolean;
}

interface ReviewStats {
  average: number;
  total: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonImg, IonIcon, IonButton, IonTextarea, IonModal, CommonModule, FormsModule]
})
export class ProductViewPage implements OnInit {
  quantity: number = 1;
  selectedVariant: string = '';
  isWishlisted: boolean = false;
  product: Product | null = null;
  relatedProducts: Product[] = [];
  productId: number | null = null;

  // Review properties
  reviews: Review[] = [];
  reviewStats: ReviewStats = { average: 0, total: 0, fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 };
  showReviewModal: boolean = false;
  newReviewRating: number = 0;
  newReviewTitle: string = '';
  newReviewContent: string = '';
  hoverRating: number = 0;

  heartIcon = heartOutline;
  starIcon = starOutline;
  cartIcon = cartOutline;
  backIcon = arrowBackOutline;
  shareIcon = shareOutline;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    addIcons({ starOutline, cartOutline, heartOutline, heart, arrowBackOutline, shareOutline, star, personCircleOutline, thumbsUpOutline, chatbubbleOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
    // Get product ID from query parameters
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productId = typeof id === 'string' ? parseInt(id, 10) : id;
        if (this.productId) {
          this.loadProduct(this.productId);

          // Check if we should open review modal
          if (params['openReview'] === 'true') {
            // Small delay to let product load first
            setTimeout(() => {
              this.openReviewModal();
            }, 500);
          }
        }
      }
    });
  }

  loadProduct(id: number) {
    const product = this.productService.getProductById(id);
    this.product = product || null;
    if (this.product) {
      // Set default variant if available
      if (this.product.variants && this.product.variants.length > 0) {
        this.selectedVariant = this.product.variants[0];
      }

      // Check if product is in wishlist
      this.isWishlisted = this.productService.isInWishlist(id);

      // Load related products
      this.relatedProducts = this.productService.getRelatedProducts(id, 4);

      // Load mock reviews
      this.loadMockReviews();
    }
  }

  loadMockReviews() {
    // Mock review data
    this.reviews = [
      {
        id: 'rev-001',
        reviewerName: 'Alex Chen',
        avatar: 'assets/icon/bocchi-za-rokku.jpeg',
        rating: 5,
        date: '2026-04-28',
        title: 'Excellent quality, exceeded expectations!',
        content: 'I\'ve been using this for a month now and I\'m extremely satisfied. The build quality is top-notch and it performs exactly as described. Would definitely recommend to anyone looking for a reliable product. Fast shipping too!',
        helpful: 24,
        images: ['assets/images/rgb-kb.jpg'],
        verified: true
      },
      {
        id: 'rev-002',
        reviewerName: 'Sarah Martinez',
        avatar: '',
        rating: 4,
        date: '2026-04-25',
        title: 'Great product, minor packaging issue',
        content: 'The product itself is fantastic and works perfectly. The only reason I\'m giving 4 stars is because the packaging was slightly damaged during shipping. But the item was unharmed. Customer service was very helpful when I contacted them.',
        helpful: 12,
        verified: true
      },
      {
        id: 'rev-003',
        reviewerName: 'John Kim',
        avatar: '',
        rating: 5,
        date: '2026-04-20',
        title: 'Best purchase this year!',
        content: 'This is hands down the best version I\'ve owned. The attention to detail is impressive and you can tell a lot of thought went into the design. Setup was quick and easy. Five stars well deserved!',
        helpful: 8,
        images: ['assets/images/amdR77800x3d.jpg'],
        verified: true
      },
      {
        id: 'rev-004',
        reviewerName: 'Emily Watson',
        avatar: '',
        rating: 3,
        date: '2026-04-15',
        title: 'Good but not great',
        content: 'It\'s decent for the price, but I expected a bit more based on the reviews. It works fine for basic use but struggles with more demanding tasks. Might upgrade to a better model in the future.',
        helpful: 5,
        verified: false
      },
      {
        id: 'rev-005',
        reviewerName: 'David Park',
        avatar: '',
        rating: 5,
        date: '2026-04-10',
        title: 'Perfect for my needs',
        content: 'Exactly what I was looking for. Great value for money and the delivery was faster than expected. The included instructions were clear and easy to follow. Will buy from this store again!',
        helpful: 15,
        verified: true
      }
    ];

    // Calculate review stats
    this.calculateReviewStats();
  }

  calculateReviewStats() {
    const total = this.reviews.length;
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = total > 0 ? sum / total : 0;

    this.reviewStats = {
      average: Math.round(average * 10) / 10,
      total: total,
      fiveStar: this.reviews.filter(r => r.rating === 5).length,
      fourStar: this.reviews.filter(r => r.rating === 4).length,
      threeStar: this.reviews.filter(r => r.rating === 3).length,
      twoStar: this.reviews.filter(r => r.rating === 2).length,
      oneStar: this.reviews.filter(r => r.rating === 1).length
    };
  }

  openReviewModal() {
    this.showReviewModal = true;
    this.newReviewRating = 0;
    this.newReviewTitle = '';
    this.newReviewContent = '';
    this.hoverRating = 0;
  }

  closeReviewModal() {
    this.showReviewModal = false;
  }

  setRating(rating: number) {
    this.newReviewRating = rating;
  }

  setHoverRating(rating: number) {
    this.hoverRating = rating;
  }

  clearHoverRating() {
    this.hoverRating = 0;
  }

  submitReview() {
    if (this.newReviewRating === 0 || !this.newReviewContent.trim()) {
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      reviewerName: 'You',
      avatar: 'assets/icon/bocchi-za-rokku.jpeg',
      rating: this.newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: this.newReviewTitle || 'Customer Review',
      content: this.newReviewContent,
      helpful: 0,
      verified: true
    };

    this.reviews.unshift(newReview);
    this.calculateReviewStats();
    this.closeReviewModal();
  }

  markHelpful(reviewId: string) {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpful++;
    }
  }

  goBack(): void {
    this.router.navigate(['/tabs/home']);
  }

  toggleWishlist(): void {
    if (!this.product) return;

    if (this.isWishlisted) {
      this.productService.removeFromWishlist(this.product.id);
    } else {
      this.productService.addToWishlist(this.product);
    }
    this.isWishlisted = !this.isWishlisted;
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
    if (!this.product) return;

    this.productService.addToCart(this.product, this.quantity, this.selectedVariant);
    this.router.navigate(['/tabs/cart']);
  }

  buyNow(): void {
    if (!this.product) return;

    // Clear cart first, then add this item for immediate checkout
    this.productService.clearCart();
    this.productService.addToCart(this.product, this.quantity, this.selectedVariant);
    this.router.navigate(['/checkout']);
  }

  viewProduct(relatedProduct: Product): void {
    this.productId = relatedProduct.id;
    this.loadProduct(relatedProduct.id);
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