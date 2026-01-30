import { Component, OnInit ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Howl } from 'howler';
import { CustomLoader } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  imports: [IonicModule,FormsModule,CommonModule]
})
export class PrincipalPage implements OnInit {

  router = inject(Router);
  authSvc = inject(AuthService);
  loader = inject(CustomLoader);

  constructor() { }

  async ngOnInit() {
    // 💡 ESTO ES CLAVE: Traemos el mail del usuario apenas carga la página
    await this.authSvc.getMailUsuario(); 
    console.log("Usuario detectado:", this.authSvc.emailUsuario);
  }

  get esAdmin() {
  // 2. Limpiamos espacios y pasamos a minúsculas para comparar
  const emailLimpio = this.authSvc.emailUsuario.trim().toLowerCase();
  
  return emailLimpio === 'admin@admin.com'; 
 }

  async cerrarSesion()
  {
    this.loader.show("Cerrando sesión...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.loader.hide();
    this.authSvc.cerrarSesion();

    this.reproducirSonidoSplash();
    this.router.navigateByUrl('/login');
  }
    irAlta() {
      this.router.navigateByUrl('/alta-usuario');
    }

    irListado() {
      this.router.navigateByUrl('/listado-usuarios');
    }

  reproducirSonidoSplash() {
    try {
    const sound = new Howl({
      src: ['assets/sounds/star-wars-2.mp3'],
      volume: 0.8
    });

    sound.play();
    }catch (e) {
      console.log('Audio bloqueado por navegador');
    }
  }

}
