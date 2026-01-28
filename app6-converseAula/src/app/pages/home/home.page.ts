import { Component,inject } from '@angular/core';
import { IonHeader, IonFabButton,IonIcon,IonGrid,IonRow, IonFab,IonCardTitle,IonCardHeader,IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonFabButton,IonIcon,CommonModule, FormsModule, IonContent,IonGrid,IonRow, IonFab,IonCardTitle,IonCardHeader,],
})
export class HomePage {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}
}
