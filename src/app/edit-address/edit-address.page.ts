import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkOutline, personOutline, locationOutline, trashOutline } from 'ionicons/icons';

interface Address {
  id?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonInput, IonButton, IonIcon, CommonModule, FormsModule]
})
export class EditAddressPage implements OnInit {
  address: Address = {
    fullName: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  };
  addressId: string | null = null;
  isNewAddress = true;
  pageTitle = 'Add Address';

  // Mock address data - in real app this would come from a service
  private mockAddresses: Address[] = [
    {
      id: '1',
      fullName: 'Hitori Gotoh',
      phone: '0912345678',
      street: 'c/o STARRY Live House 3-2-1 Shimokitazawa',
      city: 'Setagaya-ku Tokyo',
      postalCode: '155-0031',
      country: 'Japan'
    },
    {
      id: '2',
      fullName: 'Hitori Gotoh',
      phone: '0912345678',
      street: '123 Main Street, Apartment 4B',
      city: 'Shibuya-ku Tokyo',
      postalCode: '150-0001',
      country: 'Japan'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ arrowBackOutline, checkmarkOutline, personOutline, locationOutline, trashOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.addressId = params['id'] || null;
      this.isNewAddress = !this.addressId;
      this.pageTitle = this.isNewAddress ? 'Add Address' : 'Edit Address';

      if (this.addressId) {
        this.loadAddress(this.addressId);
      }
    });
  }

  loadAddress(id: string) {
    const existingAddress = this.mockAddresses.find(a => a.id === id);
    if (existingAddress) {
      this.address = { ...existingAddress };
    }
  }

  goBack() {
    this.router.navigate(['/address-list']);
  }

  saveAddress() {
    // Save address logic here
    this.router.navigate(['/address-list']);
  }

  deleteAddress() {
    if (confirm('Are you sure you want to delete this address?')) {
      // Delete logic here
      this.router.navigate(['/address-list']);
    }
  }
}
