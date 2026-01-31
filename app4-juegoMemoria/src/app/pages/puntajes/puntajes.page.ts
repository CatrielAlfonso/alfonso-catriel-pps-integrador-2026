import { CommonModule, } from '@angular/common';
import { Component, OnInit,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonSpinner,IonGrid,IonText,IonFab,IonFabButton,IonContent, IonToolbar,IonTitle,IonSegmentButton,AlertController,IonRow,IonButton,IonFooter, IonIcon, IonCol } from "@ionic/angular/standalone";
import { PuntajesService , IPuntaje} from 'src/app/services/puntajes.service';
import { Observable,from  } from 'rxjs';
//import { IPuntaje } from 'src/app/models/puntaje.model';
import { TimeFormatPipe } from 'src/app/pipes/time-format.pipe-pipe';
import { ShortMailPipe } from 'src/app/pipes/short-mail.pipe-pipe';
import { ShortDatePipe } from 'src/app/pipes/short-date.pipe-pipe';


@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
  imports:[IonContent,CommonModule, IonText,IonCol,
    IonSpinner,
     ShortMailPipe,
  ShortDatePipe,
  TimeFormatPipe,
    IonFab,IonFabButton,IonIcon,RouterLink,IonGrid,IonRow,IonButton]
})
export class PuntajesPage implements OnInit {

  
  puntajesService = inject(PuntajesService);
  mostrarTabla: boolean;
  observablePuntajes!: Observable<IPuntaje[]>;

  dificultadSeleccionada: string = '';

  constructor() 
  {
    this.mostrarTabla = false;
    this.spinnerMostrandose = true; 
  }
  ngOnInit(): void {
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  CambiarTablaDePuntajes(dificultad: string): void
  {
    this.dificultadSeleccionada = dificultad;
    this.observablePuntajes = from(
        this.puntajesService.ObtenerPuntajes(dificultad)
      );
      this.mostrarTabla = true;
    //this.observablePuntajes.forEach(valor=> console.log(valor))
  }

  spinnerMostrandose: boolean;


  getHeaderClass() {
    switch (this.dificultadSeleccionada) {
      case 'facil':
        return 'tabla-facil-header';
      case 'medio':
        return 'tabla-medio-header';
      case 'dificil':
        return 'tabla-dificil-header';
      default:
        return '';
    }
  }

  getBodyClass() {
    switch (this.dificultadSeleccionada) {
      case 'facil':
        return 'tabla-facil-body';
      case 'medio':
        return 'tabla-medio-body';
      case 'dificil':
        return 'tabla-dificil-body';
      default:
        return '';
    }
  }
}
