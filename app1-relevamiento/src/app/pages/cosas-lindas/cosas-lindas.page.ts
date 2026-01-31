import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonFabButton,IonHeader,IonCard,IonFab,IonCol, IonSpinner, IonButton,IonContent,IonList,IonItem, IonRow,IonIcon,IonToolbar,IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomLoader } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  imports:[IonContent,IonCard, IonButton,IonList,IonItem,IonRow,IonIcon,
    IonCol,
    IonSpinner,
    IonFab, RouterLink,
    IonFabButton,CommonModule]
})
export class CosasLindasPage implements OnInit {

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
    this.fotos = await this.imagenesService.obtenerFotos('cosas-lindas');
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
    await this.imagenesService.guardarFoto('cosas-lindas');
    await this.obtenerFotos();
    this.customLoader.hide();
  }

}
