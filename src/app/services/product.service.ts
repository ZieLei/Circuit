import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  sales: number;
  category: string;
  brand: string;
  description: string;
  variants?: string[];
  specifications?: { label: string; value: string }[];
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private wishlistItems = new BehaviorSubject<Product[]>([]);

  cartItems$ = this.cartItems.asObservable();
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadCartFromStorage();
    this.loadWishlistFromStorage();
  }

  private loadProducts(): void {
    this.http.get<{ products: Product[] }>('/assets/products.json').subscribe({
      next: (data) => {
        this.products = data.products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }

  getProductsByBrand(brand: string): Product[] {
    return this.products.filter(p => p.brand === brand);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  getRelatedProducts(productId: number, limit: number = 4): Product[] {
    const product = this.getProductById(productId);
    if (!product) return [];
    
    return this.products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  }

  getFeaturedProducts(limit: number = 8): Product[] {
    return [...this.products]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, limit);
  }

  getDealsProducts(limit: number = 8): Product[] {
    return [...this.products]
      .filter(p => p.discount && p.discount > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, limit);
  }

  getNewArrivals(limit: number = 8): Product[] {
    return [...this.products]
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);
  }

  // Cart Methods
  addToCart(product: Product, quantity: number = 1, variant?: string): void {
    const currentCart = this.cartItems.value;
    const existingIndex = currentCart.findIndex(
      item => item.product.id === product.id && item.selectedVariant === variant
    );

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += quantity;
    } else {
      currentCart.push({ product, quantity, selectedVariant: variant });
    }

    this.cartItems.next(currentCart);
    this.saveCartToStorage();
  }

  removeFromCart(productId: number, variant?: string): void {
    const currentCart = this.cartItems.value.filter(
      item => !(item.product.id === productId && item.selectedVariant === variant)
    );
    this.cartItems.next(currentCart);
    this.saveCartToStorage();
  }

  updateCartQuantity(productId: number, quantity: number, variant?: string): void {
    const currentCart = this.cartItems.value.map(item => {
      if (item.product.id === productId && item.selectedVariant === variant) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.next(currentCart);
    this.saveCartToStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCartToStorage();
  }

  // Wishlist Methods
  addToWishlist(product: Product): void {
    const currentWishlist = this.wishlistItems.value;
    if (!currentWishlist.find(p => p.id === product.id)) {
      currentWishlist.push(product);
      this.wishlistItems.next(currentWishlist);
      this.saveWishlistToStorage();
    }
  }

  removeFromWishlist(productId: number): void {
    const currentWishlist = this.wishlistItems.value.filter(p => p.id !== productId);
    this.wishlistItems.next(currentWishlist);
    this.saveWishlistToStorage();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some(p => p.id === productId);
  }

  getWishlistItems(): Product[] {
    return this.wishlistItems.value;
  }

  // Storage Methods
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Reconstruct cart items with product references
        const cartItems: CartItem[] = parsed.map((item: any) => ({
          ...item,
          product: this.getProductById(item.product.id) || item.product
        }));
        this.cartItems.next(cartItems);
      } catch (e) {
        console.error('Error loading cart from storage:', e);
      }
    }
  }

  private saveWishlistToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems.value));
  }

  private loadWishlistFromStorage(): void {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        // Reconstruct wishlist with product references
        const wishlistItems: Product[] = parsed.map((item: any) => 
          this.getProductById(item.id) || item
        );
        this.wishlistItems.next(wishlistItems);
      } catch (e) {
        console.error('Error loading wishlist from storage:', e);
      }
    }
  }
}