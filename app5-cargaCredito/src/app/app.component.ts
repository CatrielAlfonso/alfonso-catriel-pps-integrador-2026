import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
 router = inject(Router);

  constructor() { this.router.navigateByUrl("/splash"); }
}
