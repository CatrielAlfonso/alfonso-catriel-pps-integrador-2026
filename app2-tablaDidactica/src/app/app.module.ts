import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy,RouterModule,Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePage } from './home/home.page';
import { FormsModule } from '@angular/forms';
import { DeviceOrientation } from '@awesome-cordova-plugins/device-orientation/ngx';

//import {  } from '@awesome-cordova-plugins/device-orientation/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DeviceOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
