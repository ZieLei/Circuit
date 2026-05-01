import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { hardwareChipOutline, mailOutline, lockClosedOutline, shieldCheckmarkOutline, personAddOutline, logoGoogle, logoApple, logoFacebook } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor(private router: Router) {
    addIcons({ hardwareChipOutline, mailOutline, lockClosedOutline, shieldCheckmarkOutline, personAddOutline, logoGoogle, logoApple, logoFacebook });
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  signup() {
    // Signup logic here - for now just navigate to home
    this.router.navigate(['/tabs/home']);
  }
}