import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonCol,IonSpinner, IonIcon,IonGrid,IonRow,IonButton,IonItem,IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.page.html',
  styleUrls: ['./chat-b.page.scss'],
  standalone: true,
 imports: [IonFooter,IonCol,IonSpinner,IonIcon
    ,IonButton,IonGrid,IonRow, IonContent, IonItem,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]})
export class ChatBPage implements OnInit {

    chatService = inject(ChatService);
  authService = inject(AuthService);

   observableMensajes!: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
  usuarioLogueado: string = "";
  spinnerMostrandose: boolean = true;


  constructor() { 
    this.chatService.iniciarChat("Aula-B");
  this.observableMensajes = this.chatService.ObtenerMensajes();
  }

  
   async ngOnInit(): Promise<void> {
    this.usuarioLogueado = await this.authService.getMailUsuario();
  }

  AlternarChat(): void 
  {
    this.chatAbierto = !this.chatAbierto;
  }

  MandarMensaje(): void 
  {
    this.chatService.GuardarMensaje(this.mensaje, "Aula-B");
    this.mensaje = "";
  }


}
