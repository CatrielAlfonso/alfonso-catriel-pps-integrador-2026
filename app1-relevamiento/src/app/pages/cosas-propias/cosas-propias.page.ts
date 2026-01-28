import { Component, OnInit } from '@angular/core';
import { IonHeader,IonContent, IonToolbar,IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-cosas-propias',
  templateUrl: './cosas-propias.page.html',
  styleUrls: ['./cosas-propias.page.scss'],
  imports:[IonContent,IonHeader,IonToolbar,IonTitle],
})
export class CosasPropiasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
