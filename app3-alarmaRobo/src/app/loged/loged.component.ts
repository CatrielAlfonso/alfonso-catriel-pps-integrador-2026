import { Component, inject, OnInit } from '@angular/core';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { AuthService } from '../services/auth.service';
import { IonContent, IonCard, IonButton, IonIcon, IonRow, IonCol, IonSpinner, IonInput, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


interface ISonidos 
{
  audioCelularIzquierda: string;
  audioCelularDerecha: string;
  audioCelularVertical: string;
  audioCelularHorizontal: string;
}

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
  imports:[FormsModule, IonicModule, CommonModule,RouterLink]
})
export class LogedComponent  implements OnInit {

  authService = inject(AuthService);
  flashlight = inject(Flashlight);
  vibration = inject(Vibration);
  screenOrientation = inject(ScreenOrientation);
  deviceMotion = inject(DeviceMotion);
  
  celularBloqueado: boolean;
  spinnerMostrandose: boolean;
  apretado: boolean;
  activado:boolean;
  clave:string;
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  subscription: any;
  sonidos: ISonidos;
  audio = new Audio();
  primerUso: boolean 
  primerUsoLinterna: boolean 
  posicionActualCelular: string 
  posicionAnteriorCelular: string 

  constructor() 
  {
    this.celularBloqueado = false;
    this.spinnerMostrandose = true;
    this.apretado = false;
    this.activado = false;
    this.clave = "";
    this.sonidos = {
      audioCelularIzquierda: "../../../assets/sonidos/audioIzquierda.mp3",
      audioCelularDerecha: "../../../assets/sonidos/audioDerecha.mp3",
      audioCelularVertical: "../../../assets/sonidos/audioVertical.mp3",
      audioCelularHorizontal: "../../../assets/sonidos/audioHorizontal.mp3"
    };
    this.primerUso = true;
    this.primerUsoLinterna = true;
    this.posicionActualCelular = 'actual';
    this.posicionAnteriorCelular = 'anterior';
  }

  ngOnInit(): void 
  {
    setTimeout( ()=> { this.spinnerMostrandose = false}, 2000);
  }


  Comenzar(): void
  {
    if(!this.celularBloqueado)
    {
      this.celularBloqueado = true;
  
      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.accelerationX = Math.floor(acceleration.x);
        this.accelerationY = Math.floor(acceleration.y);
        this.accelerationZ = Math.floor(acceleration.z);
  
        if(acceleration.x > 5) { this.MovimientoIzquierda(); }
        else if (acceleration.x < -5) { this.MovimientoDerecha(); } 
        else if (acceleration.y >= 9) { this.MovimientoVertical(); }
        else if (acceleration.z >= 9 && (acceleration.y >= -2 && acceleration.y <= 2) && (acceleration.x >= -2 && acceleration.x <= 2)) { this.MovimientoHorizontal(); } // --- Celular acostado
      });
    }
  }

  // --- Al cambiar la posición, a izquierda o a derecha, emitirá un sonido distinto para cada lado.
  MovimientoIzquierda()
  {
    this.posicionActualCelular = "izquierda"
    if(this.posicionActualCelular != this.posicionAnteriorCelular)
    {
      this.posicionAnteriorCelular = "izquierda";
      this.audio.src = this.sonidos.audioCelularIzquierda;
      this.audio.play();
    }
  }

  // --- Al cambiar la posición, a izquierda o a derecha, emitirá un sonido distinto para cada lado.
  MovimientoDerecha(): void
  {
    this.posicionActualCelular = "derecha";

    if(this.posicionActualCelular!= this.posicionAnteriorCelular)
    {
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.sonidos.audioCelularDerecha;
      this.audio.play();
    }
  }

  // --- Al ponerlo vertical, se encenderá la luz (por 5 segundos) y al mismo tiempo emitirá un sonido.
  MovimientoVertical(): void
  {
    this.posicionActualCelular = "vertical";
              
    if(this.posicionActualCelular != this.posicionAnteriorCelular)
    {
      this.posicionAnteriorCelular = "vertical";
      this.flashlight.switchOn();
      this.audio.src = this.sonidos.audioCelularVertical;
      this.audio.play();
      setTimeout(() => { this.flashlight.switchOff(); }, 5000);
    }
  }

  // --- Al ponerlo horizontal, vibrará (por 5 segundos) y al mismo tiempo emitirá otro sonido.
  MovimientoHorizontal(): void
  {
    this.posicionActualCelular = "horizontal";

    if(this.posicionActualCelular != this.posicionAnteriorCelular)
    {
      this.posicionAnteriorCelular = "horizontal";
      this.audio.src = this.sonidos.audioCelularHorizontal;
      this.audio.play();
      this.vibration.vibrate(5000);
    }
  }

  Desactivar(): void
  {
    const passCorrecta = localStorage.getItem('passwordUsuario');

    if (this.clave == "111111" || this.clave == "222222" || this.clave == "333333" || this.clave == "prueba")
    {
      this.celularBloqueado = false;
      this.subscription.unsubscribe();
      this.audio.pause();
    }
    else
    {
      this.flashlight.switchOn();
      this.vibration.vibrate(5000);
      this.audio.src = this.sonidos.audioCelularHorizontal;
      this.audio.play();

      setTimeout(() => { this.flashlight.switchOff(); }, 5000);
    }

    this.clave = "";
  }

}
