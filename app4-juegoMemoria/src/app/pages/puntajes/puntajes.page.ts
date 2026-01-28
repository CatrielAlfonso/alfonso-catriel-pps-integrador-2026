import { Component, OnInit } from '@angular/core';
import { IonHeader,IonContent, IonToolbar,IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
  imports:[IonContent,IonHeader,IonToolbar,IonTitle],
})
export class PuntajesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
