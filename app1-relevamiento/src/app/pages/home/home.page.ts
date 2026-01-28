import { Component, OnInit, inject} from '@angular/core';
import {  IonGrid, IonRow ,IonCard,IonHeader,IonContent, IonToolbar,IonTitle, IonButton,IonItemDivider,IonCardHeader } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
   imports:[IonContent,IonCardHeader,IonButton,IonItemDivider, IonCard,IonGrid,IonRow],
})
export class HomePage {

   authService = inject(AuthService);
  //userService = inject(UserService);
  //imgService = inject(ImagenesService);

  usuario: string = "";
  constructor() {}

}
