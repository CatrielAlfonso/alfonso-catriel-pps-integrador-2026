import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent ,IonLabel} from '@ionic/angular/standalone';
import {Howl, Howler} from 'howler';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports:[IonContent,IonLabel],
})
export class SplashPage implements OnInit {

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
    const sound = new Howl({
      src: ['../../../assets/sonidos/among-us.mp3'],
      volume: 0.8
    });

    sound.play();
  }

}
