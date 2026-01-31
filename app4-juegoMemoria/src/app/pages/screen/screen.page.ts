import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AudioService } from 'src/app/services/audio.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.page.html',
  styleUrls: ['./screen.page.scss'],
  imports: [IonContent]
})
export class ScreenPage implements OnInit {

   constructor(private router: Router, private audio:AudioService) {}

  async ngOnInit() {

    this.reproducirSonidoSplash();
    setTimeout(() => {
      this.router.navigateByUrl('/ingreso');
    }, 3800);
  } 

     reproducirSonidoSplash() {
    try {
    const sound = new Howl({
      src: ['assets/sounds/nouveau-jingle-netflix.mp3'],
      volume: 0.8
    });

    sound.play();
    }catch (e) {
      console.log('Audio bloqueado por navegador');
    }
  }

}
