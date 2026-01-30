import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader,IonContent } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.page.html',
  styleUrls: ['./screen.page.scss'],
  imports: [IonicModule]
})
export class ScreenPage implements OnInit {

    constructor(private router: Router) {}

  async ngOnInit() {
    //await this.audio.preload();
    this.reproducirSonidoSplash();
    //this.audio.playInicio();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3800);
  }

   reproducirSonidoSplash() {
    try {
    const sound = new Howl({
      src: ['assets/sounds/swing3-94210.mp3'],
      volume: 0.8
    });

    sound.play();
    }catch (e) {
      console.log('Audio bloqueado por navegador');
    }
  }

}
