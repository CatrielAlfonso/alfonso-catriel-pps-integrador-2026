import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service'; // Ajusta la ruta
import { CustomLoader } from '../../services/custom-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, ReactiveFormsModule,FormsModule, CommonModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private loader: CustomLoader,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.loginForm.invalid) return;

    const loader = await this.loadingCtrl.create({ message: 'Verificando...' });
    //await loader.present();
     this.loader.show("Verificando credenciales...");
    //hacerlo 2 segundos más lento para ver el loader
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { correo, clave } = this.loginForm.value;
    
    try {
      const res = await this.authSvc.IniciarSesion(correo, clave);
      if (!res.huboError) {
        // Guardamos la clave en local por si la usa la alarma de robo
        localStorage.setItem('passwordUsuario', clave);
        this.loader.hide();
        this.router.navigateByUrl('principal'); 
      } else {
        this.mensajeError = res.mensajeError || 'Credenciales inválidas';
        this.mostrarToast("❌ " + this.mensajeError, "danger");
      }
    } catch (error) {
      this.mensajeError = 'Error de conexión';
      console.error('Error durante el inicio de sesión:');
      this.mostrarToast("❌ ERROR DE CONEXIÓN", "danger");
    } finally {
      this.loader.hide();
      loader.dismiss();
    }
  }


    async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'top',
      cssClass: 'custom-toast' // Puedes darle estilo en el SCSS
    });
    toast.present();
  }

  accesoRapido(perfil: string) {
  const cuentas: any = {
    admin: { correo: 'admin@admin.com', clave: '111111' },
    cliente: { correo: 'usuario@usuario.com', clave: '333333' },
    empleado: { correo: 'invitado@invitado.com', clave: '222222' }
  };
  
  // 1. Cargamos los datos en el formulario
  this.loginForm.patchValue(cuentas[perfil]);

  // 2. ¡IMPORTANTE! Ejecutamos la función de ingreso automáticamente
  this.ingresar(); 
  }

}
