import { Component,inject } from '@angular/core';
import { IonHeader, IonSpinner,IonFabButton,IonIcon,IonGrid,IonRow, IonFab,IonCardTitle,IonCardHeader,IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ... otros imports
import { addIcons } from 'ionicons'; //
import { logOutOutline } from 'ionicons/icons'; //
import { Howl, Howler } from 'howler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonSpinner,IonFabButton,IonIcon,CommonModule, FormsModule, IonContent,IonGrid,IonRow, IonFab,IonCardTitle,IonCardHeader,],
})
export class HomePage {
  authService = inject(AuthService);
  router = inject(Router);

  // Agregamos un flag para el spinner
  public cargandoCierre: boolean = false;

  constructor() {
    // REGISTRAR EL ICONO AQUÍ
    addIcons({ logOutOutline }); //
  }

   reproducirSonidoSplash() {
    const sound = new Howl({
      src: ['../../../assets/sounds/click-234708.mp3'],
      volume: 0.8
    });

    sound.play();
  }


  async cerrarSesionPersonalizado() {
    this.cargandoCierre = true; // Mostramos el spinner
    this.reproducirSonidoSplash();
    // Esperamos un poco para que se vea el spinner antes de salir
    setTimeout(async () => {
      await this.authService.cerrarSesion();
      this.router.navigateByUrl('/login'); // Redirigir manualmente si es necesario
      this.cargandoCierre = false;
    }, 1500);
  }
}
