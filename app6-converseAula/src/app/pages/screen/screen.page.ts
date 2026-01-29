import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
//import { AudioService } from 'src/app/services/audio.service';
import { Howl, Howler } from 'howler';


@Component({
  selector: 'app-screen',
  templateUrl: './screen.page.html',
  styleUrls: ['./screen.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class ScreenPage implements OnInit {

  constructor(private router: Router) {}

  reproducirSonidoSplash() {  
    const sound = new Howl({
      src: ['../../../assets/sounds/gated.mp3'],
      volume: 0.8,
      //html5: true
    });

    sound.play();
  }

  async ngOnInit() {
    //await this.audio.preload();
    //this.audio.playInicio();
    this.reproducirSonidoSplash();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3800);
  }

}
