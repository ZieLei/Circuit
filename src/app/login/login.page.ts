import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { hardwareChipOutline, mailOutline, lockClosedOutline, logInOutline, logoGoogle, logoApple, logoFacebook } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private router: Router) {
    addIcons({ hardwareChipOutline, mailOutline, lockClosedOutline, logInOutline, logoGoogle, logoApple, logoFacebook });
  }

  ngOnInit() {
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  login() {
    // Login logic here - for now just navigate to home
    this.router.navigate(['/tabs/home']);
  }

  forgotPassword() {
    // Forgot password logic
    alert('Forgot password functionality coming soon!');
  }
}