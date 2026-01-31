import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { AudioService } from '../../services/audio.service';
import { Howler , Howl} from 'howler';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.page.html',
  styleUrls: ['./screen.page.scss'],
  imports:[IonContent]
})
export class ScreenPage implements OnInit {

    constructor(private router: Router) {}

  async ngOnInit() {
    this.reproducirSonidoSplash();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3800);
  }


  reproducirSonidoSplash() {
    const sound = new Howl({
      src: ['../../../assets/sounds/InicioLosFritos.mp3'],
      volume: 0.8
    });

    sound.play();
  }

}
