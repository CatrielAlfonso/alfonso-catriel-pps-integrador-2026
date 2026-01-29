import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput,IonContent,IonCol,IonSpinner, IonIcon,IonGrid,IonRow,IonButton,IonItem,IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons'; //
import { sendOutline, returnUpBackOutline} from 'ionicons/icons'; //
import { RouterLink } from '@angular/router';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.page.html',
  styleUrls: ['./chat-b.page.scss'],
  standalone: true,
 imports: [RouterLink,IonFooter,IonInput,IonCol,IonSpinner,IonIcon
    ,IonButton,IonGrid,IonRow, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]})
export class ChatBPage implements OnInit {

    chatService = inject(ChatService);
  authService = inject(AuthService);

   observableMensajes!: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
  usuarioLogueado: string = "";
  spinnerMostrandose: boolean = true;


  constructor() { 

    addIcons({ sendOutline, returnUpBackOutline}); //

    this.chatService.iniciarChat("Aula-B");
    this.observableMensajes = this.chatService.ObtenerMensajes();
    // AGREGAR ESTO:
    setTimeout(() => { 
      this.spinnerMostrandose = false; 
    }, 1500);
  }

  reproducirSonidoMensaje() {
    const sound = new Howl({
      src: ['../../../assets/sounds/enviado.mp3'],
      volume: 0.8
    });

    sound.play();
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
    this.reproducirSonidoMensaje();
    this.chatService.GuardarMensaje(this.mensaje, "Aula-B");
    this.mensaje = "";
  }


}
