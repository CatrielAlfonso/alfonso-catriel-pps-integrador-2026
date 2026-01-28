import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Howl } from 'howler';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [IonContent, CommonModule]
})
export class SplashPage implements OnInit {

  // router = inject(Router);
  
  ngOnInit() { 
      this.reproducirSonidoSplash();

    setTimeout(() => { 

      console.log("Redirigiendo desde splash a login...");
      this.router.navigateByUrl('/login'); 
    }, 3000);
  }
  
  constructor(private router: Router) { 
     
  }

  reproducirSonidoSplash() {
    try {
    const sound = new Howl({
      src: ['assets/sounds/wypy.mp3'],
      volume: 0.8
    });

    sound.play();
    }catch (e) {
      console.log('Audio bloqueado por navegador');
    }
  }

}
