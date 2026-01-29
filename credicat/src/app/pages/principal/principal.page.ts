import { Creditos } from './../../classes/creditos';
import { CreditosService } from './../../services/creditos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader,IonButtons, IonList,IonLabel,IonItem,IonIcon,IonCard,IonCardHeader,IonTitle,IonButton, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { supabase } from 'src/app/services/supabase-client.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  imports: [CommonModule, IonContent, IonHeader,IonList,IonButtons, IonTitle,IonLabel, IonButton, IonToolbar,IonItem,IonIcon,]
})
export class PrincipalPage implements OnInit {

  public unUsuario: Creditos = new Creditos();
  public scannedBarCode: boolean = false;
  public monto: number = 0;
  esconder: boolean = true;
  encodedData: any = '';
  //barcodeScannerOptions: BarcodeScannerOptions;
  public saldo: Creditos = new Creditos();

  usuarioLogeado: any;

  constructor(
  private router: Router,
  private creditoSvc: CreditosService,
  public toastController: ToastController
  ) {}

  
  async presentToastInfo(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastError() {
  const toast = await this.toastController.create({
    message: '⚠️ Ese código QR ya fue utilizado',
    duration: 2200,
    position: 'bottom',
    color: 'danger'
  });
  toast.present();
  }

 reproducirSonidoSplash() {
    const sound = new Howl({
      src: ['../../../assets/sounds/cash-register.mp3'],
      volume: 0.8
    });

    sound.play();
  }


  async scanBRcode() {

    const isWeb =!window.hasOwnProperty('Capacitor');

    if (isWeb) 
    {
      // SIMULACIÓN PARA WEB:
      const codigoSimulado = window.prompt(
      "SIMULADOR QR (Web)\nPegue un código:\n10: 8c95def646b6127282ed50454b73240300dccabc\n50: ae4c77f28b778627391305930460057567669c1d\n100: 2786f0487915971487335d79459193614595d024"
    );
    if (codigoSimulado) {
      this.procesarCodigo(codigoSimulado);
    }
      // // Puedes cambiar este string por: '8c95def646b6127282ed50454b73240300dccabc' (10)
      // // o 'ae4c77f28b778627391305930460057567669c1d' (50), etc.
      // const qrSimulado = '8c95def646b6127282ed50454b73240300dccabc'; 
      // this.handleQrCode(qrSimulado); 
    }else 
    {


            try {
              const { barcodes } = await BarcodeScanner.scan();

              if (!barcodes.length) {
                await this.presentToastInfo('No se detectó ningún código QR');
                return;
              }

              const codigo = barcodes[0].rawValue || barcodes[0].displayValue;
              console.log('📷 QR Escaneado:', codigo);

              this.monto = this.MontoQR(codigo.trim());

              if (this.monto > 0) {
                this.scannedBarCode = true;
                //await this.presentToastInfo('QR inválido');
                return;
              }else {
              this.scannedBarCode = false;
              this.presentToastInfo('⚠️ Código QR no reconocido'); // Feedback vital
            }

            } catch (error) {
              console.error('Error escaneando QR:', error);
            }

    }
  }


  // Creamos esta función para que ambos (web y móvil) usen la misma lógica
procesarCodigo(codigo: string) {
  this.scannedBarCode = true; // <--- ESTO HACE QUE APAREZCA TU BOTÓN "CARGAR"
  if (codigo === '8c95def646b6127282ed50454b73240300dccabc') this.monto = 10;
  else if (codigo === 'ae4c77f28b778627391305930460057567669c1d') this.monto = 50;
  else if (codigo === '2786f0487915971487335d79459193614595d024') this.monto = 100;
  else {
    this.monto = 0;
    this.scannedBarCode = false;
    this.presentToastInfo('Código QR no válido');
  }
}
handleQrCode(codigo: string) {
  this.scannedBarCode = true;
  if (codigo === '8c95def646b6127282ed50454b73240300dccabc') this.monto = 10;
  else if (codigo === 'ae4c77f28b778627391305930460057567669c1d') this.monto = 50;
  else if (codigo === '2786f0487915971487335d79459193614595d024') this.monto = 100;
  else {
    this.monto = 0;
    this.scannedBarCode = false;
    this.presentToastInfo('Código QR no válido');
  }
}



  async ngOnInit() {
    const userEmail = localStorage.getItem('usuarioLogueado'); 
    
    if (userEmail) {
      this.unUsuario.usuario = userEmail;
      const idAsignado = this.asignarIDUsuario(); 
      this.unUsuario.id = idAsignado; 

      try {
        const data = await this.creditoSvc.traerCredito(idAsignado);
        if (data) {
          // En lugar de this.unUsuario = data, pasamos los valores uno a uno
          this.unUsuario.credito = data.credito;
          this.unUsuario.cargo10 = data.cargo10;
          this.unUsuario.cargo50 = data.cargo50;
          this.unUsuario.cargo100 = data.cargo100;
          console.log("Datos recuperados de DB:", this.unUsuario);
          // Mantenemos el ID que ya sabemos que funciona
          //this.unUsuario.id = idAsignado; 
        }else
        {
          await this.creditoSvc.CrearUsuario(this.unUsuario);
        }
      } catch (error) {
        console.log("Usuario nuevo, se usará el ID asignado:", idAsignado);
      }
    }
  }



  Logout() {

    console.log(this.unUsuario)
    localStorage.removeItem('user'); // ⚠️ Si guardaste como 'usuarioLogueado', esto no borra nada.
    localStorage.removeItem('usuarioLogueado');

    //this.authService.logout(); // Asegúrate de tener este servicio implementado

    this.esconder = false; //PUSE TRUE
    this.unUsuario = new Creditos(); // Es más limpio que resetear campo por campo
    this.unUsuario.id = -1;
    console.log(this.unUsuario)
    this.router.navigateByUrl('/login');


  }

  async mostrarCredito() {
    const data = await this.creditoSvc.traerCredito(this.unUsuario.id);
    this.unUsuario = data;
  }


  esconderCreditos() {

    this.mostrarCredito();
    return this.esconder = !this.esconder;
  }

  asignarIDUsuario() {
    var correo = this.unUsuario.usuario

    switch (correo) {

      case "admin@admin.com":
        return 0;
        break;
      case "invitado@invitado.com":
        return 1;
        break;
      case "usuario@usuario.com":
        return 2;
        break;
      case "anonimo@anonimo.com":
        return 3;
        break;
      case "tester@tester.com":
        return 4;
        break;
      default:
        return 50;
    }

  }



  async eliminarCreditos() {
    this.unUsuario.cargo10 = 0;
    this.unUsuario.cargo100 = 0;
    this.unUsuario.cargo50 = 0;
    this.unUsuario.credito = 0;

    // this.creditoSvc.Cargar(this.unUsuario).then(() => {
    //   //  this.unUsuario.credito = 0;
    //   console.log('se envio la recarga');
    // });

    try {
    // Enviamos el objeto reseteado a Supabase
      await this.creditoSvc.Cargar(this.unUsuario);
      this.presentToastInfo('Billetera vaciada con éxito');
    } catch (error) {
      console.error('Error al vaciar en DB:', error);
      this.presentToastInfo('Error al limpiar la nube');
    }
  }

  
  MontoQR(codigo: string): number {

    switch (codigo) {

      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        return 100;
        break;
      case "8c95def646b6127282ed50454b73240300dccabc":
        return 10;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        return 50;
        break;
        default:
          return 0;
          break;
    }

  }

  reproducirRuidoCargaExitosa()
  {
    const sound = new Howl({
      src: ['../../../assets/sounds/mercadopago-transferencia-ok.mp3'],
      volume: 0.8
    });

    sound.play();
  }

  async CargarCredito() {
    // 1. Identificar perfil y estado actual
    const perfil = this.unUsuario.id; // 0 = admin, otros = usuario
    let sePuedeCargar = false;
    console.log("Datos a enviar:", this.unUsuario); // <--- MIRA ESTO EN LA CONSOLA
    // 2. Validar reglas de negocio según la consigna
    if (this.monto === 100) {
      if ((perfil === 0 && this.unUsuario.cargo100 < 2) || (perfil !== 0 && this.unUsuario.cargo100 === 0)) {
        this.unUsuario.cargo100++;
        this.reproducirRuidoCargaExitosa();
        sePuedeCargar = true;
      }
    } else if (this.monto === 50) {
      if ((perfil === 0 && this.unUsuario.cargo50 < 2) || (perfil !== 0 && this.unUsuario.cargo50 === 0)) {
        this.unUsuario.cargo50++;
        this.reproducirRuidoCargaExitosa();
        sePuedeCargar = true;
      }
    } else if (this.monto === 10) {
      if ((perfil === 0 && this.unUsuario.cargo10 < 2) || (perfil !== 0 && this.unUsuario.cargo10 === 0)) {
        this.unUsuario.cargo10++;
        this.reproducirRuidoCargaExitosa();
        sePuedeCargar = true;
      }
    }

    // 3. Ejecutar la carga o rechazar
    if (sePuedeCargar) {
      // Solo sumamos el crédito si la validación pasó
      this.unUsuario.credito += this.monto;
      console.log("Datos a enviar:", this.unUsuario); // <--- MIRA ESTO EN LA CONSOLA
      try {
        // Guardamos en Supabase
        await this.creditoSvc.Cargar(this.unUsuario);
        
        this.presentToastInfo(`¡Carga de $${this.monto} exitosa!`);
      } catch (error) {
        // Si falla la red/base de datos, revertimos los cambios locales
        this.unUsuario.credito -= this.monto;
        this.revertirContadorLocal(); 
        this.presentToastInfo('Error de conexión con el servidor');
      }
    } else {
      // Si ya superó el límite de cargas
      this.reproducirRuidoNoSePuede();
      this.presentToastError();
    }

    // 4. Limpiar interfaz
    this.monto = 0;
    this.scannedBarCode = false;
  }

  // Método auxiliar para mantener el código limpio
  private revertirContadorLocal() {
    if (this.monto === 100) this.unUsuario.cargo100--;
    else if (this.monto === 50) this.unUsuario.cargo50--;
    else if (this.monto === 10) this.unUsuario.cargo10--;
  }

  reproducirRuidoNoSePuede()
  {
    const sound = new Howl({
      src: ['../../../assets/sounds/tf_nemesis.mp3'],
      volume: 0.8
    });

    sound.play();
  }

}
