import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
//import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.page.html',
  styleUrls: ['./screen.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class ScreenPage implements OnInit {

  constructor(private router: Router) {}

  async ngOnInit() {
    //await this.audio.preload();
    //this.audio.playInicio();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3800);
  }

}
