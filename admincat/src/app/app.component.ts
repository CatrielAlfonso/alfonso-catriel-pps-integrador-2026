import { Component } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  constructor(private router: Router) {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
    // Si el link es admincat://login, extraemos la ruta
    const slug = event.url.split('://').pop();
    if (slug) {
        this.router.navigateByUrl(`/${slug}`);
    }
});

  }
}
