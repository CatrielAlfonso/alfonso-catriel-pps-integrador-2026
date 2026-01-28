import { Component, OnInit } from '@angular/core';
import { IonHeader,IonContent, IonToolbar,IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
   imports:[IonContent,IonHeader,IonToolbar,IonTitle],
})
export class GraficosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
