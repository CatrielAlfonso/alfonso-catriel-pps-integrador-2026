import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Creditos } from './../clases/creditos';
import { CreditosService } from './../services/creditos.service';
import { Router } from '@angular/router'
//import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {

  public unUsuario: Creditos = new Creditos();
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

      this.monto = this.MontoQR(codigo);

      if (this.monto === 0) {
        await this.presentToastInfo('QR inválido');
        return;
      }

    } catch (error) {
      console.error('Error escaneando QR:', error);
    }
  }





  async ngOnInit() {
    const data = await this.creditoSvc.traerCredito(this.unUsuario.id);
    this.unUsuario = data;
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
    this.router.navigateByUrl('/');


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
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
        return 50;
        break;
        default:
          return 0;
          break;
    }

  }

 CargarCredito(): void {

  this.unUsuario.credito = this.unUsuario.credito + this.monto;

  if (this.unUsuario.id != 0) {

    switch (this.monto) {

      case 100:
        if (this.unUsuario.cargo100 == 0) {
          this.unUsuario.cargo100 = 1;
          this.creditoSvc.Cargar(this.unUsuario);
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;

      case 50:
        if (this.unUsuario.cargo50 == 0) {
          this.unUsuario.cargo50 = 1;
          this.creditoSvc.Cargar(this.unUsuario);
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;

      case 10:
        if (this.unUsuario.cargo10 == 0) {
          this.unUsuario.cargo10 = 1;
          this.creditoSvc.Cargar(this.unUsuario);
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;
    }

  } else {

    switch (this.monto) {

      case 100:
        if (this.unUsuario.cargo100 < 2) {
          this.unUsuario.cargo100++;
          this.creditoSvc.Cargar(this.unUsuario);
          this.monto = 0;
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;

      case 50:
        if (this.unUsuario.cargo50 < 2) {
          this.unUsuario.cargo50++;
          this.creditoSvc.Cargar(this.unUsuario);
          this.monto = 0;
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;

      case 10:
        if (this.unUsuario.cargo10 < 2) {
          this.unUsuario.cargo10++;
          this.creditoSvc.Cargar(this.unUsuario);
          this.monto = 0;
        } else {
          this.unUsuario.credito -= this.monto;
          this.presentToastError();
        }
        break;
    }
  }
}




}
