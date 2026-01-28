import { Component, OnInit } from '@angular/core';
import { IonHeader,IonContent, IonToolbar,IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
  imports:[IonContent,IonHeader,IonToolbar,IonTitle]
})
export class CosasFeasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
