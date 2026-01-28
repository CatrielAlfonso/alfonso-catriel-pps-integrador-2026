import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent,IonLabel } from "@ionic/angular/standalone";
import { Howl } from 'howler';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [IonContent, IonLabel],
})
export class SplashPage implements OnInit {

  router = inject(Router);
  
  ngOnInit() { 
    this.reproducirSonidoSplash();
  }
  constructor() { setTimeout(() => { this.router.navigateByUrl("login")}, 4000); }

  reproducirSonidoSplash() {
    const sound = new Howl({
      src: ['../../assets/sounds/splash.mp3'],
      volume: 0.8
    });

    sound.play();
  }

}
