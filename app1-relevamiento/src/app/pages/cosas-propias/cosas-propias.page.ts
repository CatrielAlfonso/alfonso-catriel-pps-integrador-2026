import { IonFabButton,IonHeader,IonCard,IonFab,IonCol, IonSpinner, IonButton,IonContent,IonList,IonItem, IonRow,IonIcon,IonToolbar,IonTitle } from "@ionic/angular/standalone";
import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { AuthService } from "src/app/services/auth.service";
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cosas-propias',
  templateUrl: './cosas-propias.page.html',
  styleUrls: ['./cosas-propias.page.scss'],
 imports:[IonContent,IonCard,IonList,IonItem,IonRow,IonIcon,
    IonCol,
    IonSpinner,
    IonFab, RouterLink,
    IonFabButton,CommonModule]
})
export class CosasPropiasPage implements OnInit {

  imagenesService = inject(ImagenesService);
  authService = inject(AuthService);

  spinnerMostrandose = true;

  fotosLindasSubidas: IFotos[] = [];
  fotosFeasSubidas: IFotos[] = [];

  emailUsuario = '';

  async ngOnInit() {
    this.emailUsuario = await this.authService.getMailUsuario();

    await this.cargarFotosPropias();

    this.spinnerMostrandose = false;
  }

  async cargarFotosPropias() {
    // Limpio arrays (MUY IMPORTANTE)
    this.fotosLindasSubidas = [];
    this.fotosFeasSubidas = [];

    const fotosLindas = await this.imagenesService.obtenerFotos('cosas-lindas');
    const fotosFeas = await this.imagenesService.obtenerFotos('cosas-feas');

    this.fotosLindasSubidas = fotosLindas.filter(
      f => f.autor === this.emailUsuario
    );

    this.fotosFeasSubidas = fotosFeas.filter(
      f => f.autor === this.emailUsuario
    );
  }

}
