import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonImg, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToOrders(category?: string) {
    if (category) {
      this.router.navigate(['/orders'], { queryParams: { category } });
    } else {
      this.router.navigate(['/orders']);
    }
  }

  goToAddressList() {
    this.router.navigate(['/address-list']);
  }
}