import { Creditos } from './../../classes/creditos';
import { CreditosService } from './../../services/creditos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader,IonButtons, IonList,IonLabel,IonItem,IonIcon,IonCard,IonCardHeader,IonTitle,IonButton, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

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



  async scanBRcode() {
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





  async ngOnInit() {
    // Cambiamos 'user' por 'usuarioLogueado' que es lo que guarda tu AuthService
  const userEmail = localStorage.getItem('usuarioLogueado'); 
  
  if (userEmail) {
    this.unUsuario.usuario = userEmail;
    this.unUsuario.id = this.asignarIDUsuario(); 
    
    try {
      const data = await this.creditoSvc.traerCredito(this.unUsuario.id);
      if (data) {
        this.unUsuario = data; // Aquí se recuperan los cargos y crédito previo
      }
    } catch (error) {
      console.error("Error al traer datos iniciales:", error);
    }
  }
  }



  Logout() {
    localStorage.removeItem('user');

    this.esconder = false; //PUSE TRUE
    this.monto = 0;
    this.unUsuario.id = -1;
    this.unUsuario.usuario = "nadie";
    this.unUsuario.credito = 0;
    this.unUsuario.cargo10 = 0;
    this.unUsuario.cargo100 = 0;
    this.unUsuario.cargo50 = 0;
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



  eliminarCreditos() {
    this.unUsuario.cargo10 = 0;
    this.unUsuario.cargo100 = 0;
    this.unUsuario.cargo50 = 0;
    this.unUsuario.credito = 0;

    this.creditoSvc.Cargar(this.unUsuario).then(() => {
      //  this.unUsuario.credito = 0;
      console.log('se envio la recarga');
    });
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

  async CargarCredito() {
    // 1. Identificar perfil y estado actual
    const perfil = this.unUsuario.id; // 0 = admin, otros = usuario
    let sePuedeCargar = false;

    // 2. Validar reglas de negocio según la consigna
    if (this.monto === 100) {
      if ((perfil === 0 && this.unUsuario.cargo100 < 2) || (perfil !== 0 && this.unUsuario.cargo100 === 0)) {
        this.unUsuario.cargo100++;
        sePuedeCargar = true;
      }
    } else if (this.monto === 50) {
      if ((perfil === 0 && this.unUsuario.cargo50 < 2) || (perfil !== 0 && this.unUsuario.cargo50 === 0)) {
        this.unUsuario.cargo50++;
        sePuedeCargar = true;
      }
    } else if (this.monto === 10) {
      if ((perfil === 0 && this.unUsuario.cargo10 < 2) || (perfil !== 0 && this.unUsuario.cargo10 === 0)) {
        this.unUsuario.cargo10++;
        sePuedeCargar = true;
      }
    }

    // 3. Ejecutar la carga o rechazar
    if (sePuedeCargar) {
      // Solo sumamos el crédito si la validación pasó
      this.unUsuario.credito += this.monto;

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


}
