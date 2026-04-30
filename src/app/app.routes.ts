import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () => import('./landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.page').then(m => m.CartPage)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./wishlist/wishlist.page').then(m => m.WishlistPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  }
];