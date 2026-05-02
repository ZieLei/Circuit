import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addOutline, locationOutline, checkmarkCircle, chevronForwardOutline } from 'ionicons/icons';

interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonButton, IonIcon, CommonModule]
})
export class AddressListPage implements OnInit {
  addresses: Address[] = [
    {
      id: '1',
      fullName: 'Hitori Gotoh',
      phone: '0912345678',
      street: 'c/o STARRY Live House 3-2-1 Shimokitazawa',
      city: 'Setagaya-ku Tokyo',
      postalCode: '155-0031',
      country: 'Japan',
      isDefault: true
    },
    {
      id: '2',
      fullName: 'Hitori Gotoh',
      phone: '0912345678',
      street: '123 Main Street, Apartment 4B',
      city: 'Shibuya-ku Tokyo',
      postalCode: '150-0001',
      country: 'Japan',
      isDefault: false
    }
  ];

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, addOutline, locationOutline, checkmarkCircle, chevronForwardOutline });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  addNewAddress() {
    this.router.navigate(['/edit-address']);
  }

  editAddress(address: Address) {
    this.router.navigate(['/edit-address'], {
      queryParams: { id: address.id }
    });
  }

  selectDefault(address: Address) {
    this.addresses.forEach(a => a.isDefault = false);
    address.isDefault = true;
  }
}
