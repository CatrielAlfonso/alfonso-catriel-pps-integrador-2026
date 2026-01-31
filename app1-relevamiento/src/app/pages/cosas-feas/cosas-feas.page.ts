import { Component, OnInit } from '@angular/core';
import { IonFabButton,IonHeader,IonCard,IonFab,IonCol, IonSpinner, IonButton,IonContent,IonList,IonItem, IonRow,IonIcon,IonToolbar,IonTitle } from "@ionic/angular/standalone";
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomLoader } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
  imports:[IonContent,IonCard, IonButton,IonList,IonItem,IonRow,IonIcon,
    IonCol,
    IonSpinner,
    IonFab, RouterLink,
    IonFabButton,CommonModule
  ]
})
export class CosasFeasPage implements OnInit {

imagenesService = inject(ImagenesService);
  authService = inject(AuthService);
  customLoader = inject(CustomLoader);
  spinnerMostrandose = true;
  fotos: IFotos[] = [];
  emailUsuario: string = '';

  async ngOnInit() {
    this.emailUsuario = await this.authService.getMailUsuario();
    await this.obtenerFotos();
    this.spinnerMostrandose = false;
  }

  async obtenerFotos() {
    this.customLoader.show('Cargando fotos...');
    this.fotos = await this.imagenesService.obtenerFotos('cosas-feas');
    this.customLoader.hide();
  }

  async votar(foto: IFotos) {
    await this.imagenesService.votarFoto(
      foto.id!,
      this.emailUsuario
    );
    await this.obtenerFotos(); // refresca
  }

  yaVoto(foto: IFotos): boolean {
    return foto.reaccion_usuarios.includes(
      this.emailUsuario
    );
  }

  async subirFoto() {
    this.customLoader.show('Subiendo foto...');
    await this.imagenesService.guardarFoto('cosas-feas');
    await this.obtenerFotos();
    this.customLoader.hide();
  }
}
