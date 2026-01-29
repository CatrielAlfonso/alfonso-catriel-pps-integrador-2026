import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput,IonContent,IonCol,IonSpinner, IonIcon,IonGrid,IonRow,IonButton,IonItem,IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, IMensaje } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {Howl, Howler} from 'howler';
import { addIcons } from 'ionicons'; //
import { sendOutline, returnUpBackOutline} from 'ionicons/icons'; //


@Component({
  selector: 'app-chat-a',
  templateUrl: './chat-a.page.html',
  styleUrls: ['./chat-a.page.scss'],
  standalone: true,
  imports: [RouterLink,IonInput,IonFooter,IonCol,IonSpinner,IonIcon
    ,IonButton,IonGrid,IonRow, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatAPage implements OnInit {

   chatService = inject(ChatService);
  authService = inject(AuthService);

  observableMensajes!: Observable<IMensaje[]>;
  mensaje: string = '';
  chatAbierto: boolean = false;
  usuarioLogueado: string = "";
  spinnerMostrandose: boolean = true;

  constructor() {
        addIcons({ sendOutline, returnUpBackOutline}); //
    this.chatService.iniciarChat("Aula-A");
  this.observableMensajes = this.chatService.ObtenerMensajes();
    setTimeout(() => { this.spinnerMostrandose = false; }, 1500);
  }

  async ngOnInit(): Promise<void> {
    this.usuarioLogueado = await this.authService.getMailUsuario();
  }

  reproducirSonidoMensaje() {
    const sound = new Howl({
      src: ['../../../assets/sounds/enviado.mp3'],
      volume: 0.8
    });

    sound.play();
  }

  AlternarChat(): void {
    this.chatAbierto = !this.chatAbierto;
  }

  MandarMensaje(): void {
    this.reproducirSonidoMensaje();
    this.chatService.GuardarMensaje(this.mensaje, "Aula-A");
    this.mensaje = "";
  }

}
