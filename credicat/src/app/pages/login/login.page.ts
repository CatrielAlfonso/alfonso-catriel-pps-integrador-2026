import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent,IonFab, IonHeader, IonTitle,IonButton,IonFabButton, IonFabList,IonToolbar,IonItem} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  user = new User();
  
  titulo: string;

  mensajeError: string = '';
mostrarError: boolean = false;

  constructor(private router: Router, private authSvc: AuthService, public alertCtrl: AlertController) {

    this.user.email = '';
    this.user.password = '';
    this.titulo = 'Carga Crédito'
    
   }

  ngOnInit() { }

  async onLogin() {

    
  // Reset de mensaje
  this.mostrarError = false;
  this.mensajeError = '';

  // Validación campos vacíos
  if (!this.user.email || !this.user.password) {
    this.mensajeError = 'CAMPOS VACÍOS';
    this.mostrarError = true;
    return;
  }

  // Intento de login
  const usuario = await this.authSvc.iniciarSesion(this.user.email, this.user.password);

  if (usuario) {
    console.log('Logueado!!');
    this.router.navigateByUrl('/principal');
  } 
  else {
    this.mensajeError = 'USUARIO NO ENCONTRADO';
    this.mostrarError = true;
  }

  }





  Clear() {
    this.user.email = '';
    this.user.password = '';
  }

  public LoginRapido() {
    this.user.email = "invitado@invitado.com";
    this.user.password = '123456';

  }


  login_Admin(){
    this.user.email = "admin@admin.com";
    this.user.password = '111111';
    console.log('Iniciando login rapido, perfil Admin.' + '['+ Date.now() + ']');

  }
  login_Invitado(){
    this.user.email = "invitado@invitado.com";
    this.user.password = '222222';
    console.log('Iniciando login rapido, perfil Invitado.' + '['+ Date.now() + ']');

  }
  login_Usuario(){
    this.user.email = "usuario@usuario.com";
    this.user.password = '333333';
    console.log('Iniciando login rapido, perfil Usuario.' + '['+ Date.now() + ']');
  }
  login_Anonimo(){
    this.user.email = "anonimo@anonimo.com";
    this.user.password = '444444';
    console.log('Iniciando login rapido, perfil Anonimo.' + '['+ Date.now() + ']');

  }

  login_Tester(){
    this.user.email = "tester@tester.com";
    this.user.password = '555555';
    console.log('Iniciando login rapido, perfil Tester.' + '['+ Date.now() + ']');

  }

}
