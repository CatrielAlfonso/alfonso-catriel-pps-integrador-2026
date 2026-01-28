import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent ,IonLabel} from '@ionic/angular/standalone';

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
    //this.audio.playInicio();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3800);
  }

}
