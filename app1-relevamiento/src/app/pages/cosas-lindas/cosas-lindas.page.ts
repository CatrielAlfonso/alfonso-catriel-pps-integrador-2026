import { Component, OnInit } from '@angular/core';
import { IonHeader,IonContent, IonToolbar,IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  imports:[IonContent,IonHeader,IonToolbar,IonTitle]
})
export class CosasLindasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
