import { Component, OnInit,inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
//import { getAuth, signOut } from "firebase/auth";
import { AuthService } from '../services/auth.service';

import { Howl, Howler } from 'howler';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation/ngx'
import { IonicModule } from '@ionic/angular';
import { SweetAlertService } from '../services/sweet-alert.service';


@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LogedComponent implements OnInit {

  lenguajeActual = "español";
  temaActual = "colores";
  sweetAlertService = inject(SweetAlertService);
  authService = inject(AuthService);
  deviceOrientation:any;

  constructor(private routerRecieved:Router, deviceOrientationRecieved:DeviceOrientation) {
    this.deviceOrientation = deviceOrientationRecieved;
  }


  ngOnInit() 
  {
  }

  async logOut()
  {

    const sound = new Howl({
      src: ['../../assets/sounds/byebye.mp3'],
      volume: 0.8
    });

    //hacer 
    sound.play();

    //await this.sweetAlertService.showTemporaryAlert('Cerrando sesión...',"info","info");

    await this.authService.cerrarSesion().then(() => 
    {
      // Sign-out successful.
      
      this.routerRecieved.navigate(['/home']);
      //this.sweetAlertService.showAlert("Éxito","Sesión cerrada correctamente.","success");

    }).catch((error:any) => 
    {
      this.sweetAlertService.showAlert("Error","No se pudo cerrar sesión.","error");
      console.log(error);
    });

  }

  async itemClickeado(nroItemRecibido:number)
  {  
    this.reproducirSonido(nroItemRecibido);  
  }

  actualizarLenguaje(lenguaje:string)
  {
    let languageShowed = document.getElementById("language-showed");

    if (!languageShowed) return; 

    //if (!themeShowed) return; 

    switch (lenguaje) 
    {
      case 'español':
      {
        languageShowed.innerHTML = '🇪🇸';
        break;
      }
      case 'portugues':
      {
        languageShowed.innerHTML = '🇵🇹';
        break;
      }
      case 'ingles':
      {
        languageShowed.innerHTML = '🇬🇧';
        break;
      }
    }

    this.lenguajeActual = lenguaje;
    console.log(this.lenguajeActual);
  }

  actualizarTema(tema:string)
  {
    let themeShowed = document.getElementById("theme-showed");
    if (!themeShowed) return; 

    switch (tema) 
    {
      case 'animales':
      {
        themeShowed.innerHTML = '🐱';
        break;
      }
      case 'colores':
      {
        themeShowed.innerHTML = '🔵';
        break;
      }
      case 'numeros':
      {
        themeShowed.innerHTML = '🔢';
        break;
      }
    }

    this.temaActual = tema;
    console.log(this.temaActual);
    this.actualizarBackground(this.temaActual)
  }

  reproducirSonido(itemClickeado:number)
  {
      let lenguajeActual = this.lenguajeActual;
      let temaActual = this.temaActual;

      switch (lenguajeActual) 
      {
        case "español":
        {
            switch (temaActual) 
            {
              case "colores":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/rojo.mp3', 'rojo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/azul.mp3', 'azul.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/verde.mp3', 'verde.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/amarillo.mp3', 'amarillo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/blanco.mp3', 'blanco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/negro.mp3', 'negro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              } 
              case "animales":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/perro.mp3', 'perro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/gato.mp3', 'gato.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/conejo.mp3', 'conejo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/elefante.mp3', 'elefante.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/tortuga.mp3', 'tortuga.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/vaca.mp3', 'vaca.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
              case "numeros":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/uno.mp3', 'uno.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/dos.mp3', 'dos.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/tres.mp3', 'tres.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/cuatro.mp3', 'cuatro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/cinco.mp3', 'cinco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/seis.mp3', 'seis.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
            }

          break;
        }
        case "ingles":
        {
          switch (temaActual) 
            {
              case "colores":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/rojo.mp3', 'rojo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/azul.mp3', 'azul.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/verde.mp3', 'verde.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/amarillo.mp3', 'amarillo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/blanco.mp3', 'blanco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/negro.mp3', 'negro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              } 
              case "animales":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/perro.mp3', 'perro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/gato.mp3', 'gato.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/conejo.mp3', 'conejo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/elefante.mp3', 'elefante.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/tortuga.mp3', 'tortuga.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/vaca.mp3', 'vaca.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
              case "numeros":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/uno.mp3', 'uno.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/dos.mp3', 'dos.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/tres.mp3', 'tres.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/cuatro.mp3', 'cuatro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/cinco.mp3', 'cinco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/seis.mp3', 'seis.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
          }

          break;
        }
        case "portugues":
        {
          switch (temaActual) 
          {
            case "colores":
            {
              switch (itemClickeado)
              {
                case 1:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/rojo.mp3', 'rojo.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 2:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/azul.mp3', 'azul.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 3:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/verde.mp3', 'verde.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 4:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/amarillo.mp3', 'amarillo.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 5:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/blanco.mp3', 'blanco.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 6:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/negro.mp3', 'negro.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
              }

              break;
            } 
            case "animales":
            {
              switch (itemClickeado)
              {
                case 1:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/perro.mp3', 'perro.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 2:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/gato.mp3', 'gato.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 3:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/conejo.mp3', 'conejo.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 4:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/elefante.mp3', 'elefante.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 5:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/tortuga.mp3', 'tortuga.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 6:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/vaca.mp3', 'vaca.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
              }

              break;
            }
            case "numeros":
            {
              switch (itemClickeado)
              {
                case 1:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/uno.mp3', 'uno.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 2:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/dos.mp3', 'dos.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 3:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/tres.mp3', 'tres.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 4:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/cuatro.mp3', 'cuatro.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 5:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/cinco.mp3', 'cinco.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
                case 6:
                {
                  // Setup the new Howl.
                  const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/seis.mp3', 'seis.mp3']});
                  // Play the sound.
                  sound.play();
                  break;
                }
              }

              break;
            }
          }

          break;
        }
      }
  }

  actualizarBackground(temaRecibido:string)
  {

    const ids = [
    "item1","item2","item3","item4","item5","item6",
    "item1-2","item2-2","item3-2","item4-2","item5-2","item6-2"
    ];

    const elementos = ids.map(id => document.getElementById(id));

    // Si alguno es null → salir
    if (elementos.some(el => !el)) return;

    // let item1 = document.getElementById("item1");
    // let item2 = document.getElementById("item2");
    // let item3 = document.getElementById("item3");
    // let item4 = document.getElementById("item4");
    // let item5 = document.getElementById("item5");
    // let item6 = document.getElementById("item6");

    // let item1_2 = document.getElementById("item1-2");
    // let item2_2 = document.getElementById("item2-2");
    // let item3_2 = document.getElementById("item3-2");
    // let item4_2 = document.getElementById("item4-2");
    // let item5_2 = document.getElementById("item5-2");
    // let item6_2 = document.getElementById("item6-2"); 

     const [
        item1,item2,item3,item4,item5,item6,
        item1_2,item2_2,item3_2,item4_2,item5_2,item6_2
      ] = elementos as HTMLElement[];

    switch (temaRecibido)
    {
      case "animales":
      {
      
        item1.setAttribute("src","../../assets/buttons/animales/perro.png");
        item2.setAttribute("src","../../assets/buttons/animales/gato.png");
        item3.setAttribute("src","../../assets/buttons/animales/conejo.png");
        item4.setAttribute("src","../../assets/buttons/animales/elefante.png");
        item5.setAttribute("src","../../assets/buttons/animales/tortuga.png");
        item6.setAttribute("src","../../assets/buttons/animales/vaca.png");

        item1_2.setAttribute("src","../../assets/buttons/animales/perro.png");
        item2_2.setAttribute("src","../../assets/buttons/animales/gato.png");
        item3_2.setAttribute("src","../../assets/buttons/animales/conejo.png");
        item4_2.setAttribute("src","../../assets/buttons/animales/elefante.png");
        item5_2.setAttribute("src","../../assets/buttons/animales/tortuga.png");
        item6_2.setAttribute("src","../../assets/buttons/animales/vaca.png");

        break;
      }
      case "colores":
      {

        item1.setAttribute("src","../../assets/buttons/colores/rojo.png");
        item2.setAttribute("src","../../assets/buttons/colores/azul.png");
        item3.setAttribute("src","../../assets/buttons/colores/verde.png");
        item4.setAttribute("src","../../assets/buttons/colores/amarillo.png");
        item5.setAttribute("src","../../assets/buttons/colores/blanco.png");
        item6.setAttribute("src","../../assets/buttons/colores/negro.png");

        item1_2.setAttribute("src","../../assets/buttons/colores/rojo.png");
        item2_2.setAttribute("src","../../assets/buttons/colores/azul.png");
        item3_2.setAttribute("src","../../assets/buttons/colores/verde.png");
        item4_2.setAttribute("src","../../assets/buttons/colores/amarillo.png");
        item5_2.setAttribute("src","../../assets/buttons/colores/blanco.png");
        item6_2.setAttribute("src","../../assets/buttons/colores/negro.png");

        break;
      }
      case "numeros":
      {
        
        item1.setAttribute("src","../../assets/buttons/numeros/uno.png");
        item2.setAttribute("src","../../assets/buttons/numeros/dos.png");
        item3.setAttribute("src","../../assets/buttons/numeros/tres.png");
        item4.setAttribute("src","../../assets/buttons/numeros/cuatro.png");
        item5.setAttribute("src","../../assets/buttons/numeros/cinco.png");
        item6.setAttribute("src","../../assets/buttons/numeros/seis.png");

        item1_2.setAttribute("src","../../assets/buttons/numeros/uno.png");
        item2_2.setAttribute("src","../../assets/buttons/numeros/dos.png");
        item3_2.setAttribute("src","../../assets/buttons/numeros/tres.png");
        item4_2.setAttribute("src","../../assets/buttons/numeros/cuatro.png");
        item5_2.setAttribute("src","../../assets/buttons/numeros/cinco.png");
        item6_2.setAttribute("src","../../assets/buttons/numeros/seis.png");

        break;
      }
    }
  }

}


