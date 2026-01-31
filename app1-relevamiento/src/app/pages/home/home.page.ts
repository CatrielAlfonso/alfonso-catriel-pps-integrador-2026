import { Component, OnInit, inject} from '@angular/core';
import {  IonIcon,IonGrid, IonRow ,IonCard, IonFab, IonFabButton, IonFabList,IonHeader,IonContent, IonToolbar,IonTitle, IonButton,IonItemDivider,IonCardHeader } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/services/auth.service';
import { Howler , Howl} from 'howler';
import { CustomLoader } from 'src/app/services/custom-loader.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
   imports:[IonContent,IonIcon,IonFab,IonFabButton,IonFabList ,RouterLink],
})
export class HomePage implements OnInit {

   authService = inject(AuthService);
   customLoader = inject(CustomLoader); 
  //userService = inject(UserService);
  //imgService = inject(ImagenesService);
  router = inject(Router);

  usuario: string = "";
  constructor() {}

  ngOnInit(): void {
    this.usuario = this.authService.emailUsuario || 'Usuario';
  }

  reproducirSonidoBienvenida() {
    const sound = new Howl({
      src: ['../../../assets/sounds/SalirFrito.mp3'],
      volume: 0.8
    });
    sound.play();
  }

  cerrarSesion()
  {
    this.customLoader.show('Cerrando sesión...');


    this.reproducirSonidoBienvenida();
    this.authService.cerrarSesion();
    this.customLoader.hide();

    this.router.navigate(['/login']);

  }
}
