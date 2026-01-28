import { Component, inject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, authResponse } from '../../services/auth.service';
import {IonInput,IonContent, IonItem,IonButton, IonCardHeader, IonHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
//import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonContent, IonItem, IonButton, CommonModule, FormsModule]
})
export class LoginPage  {

   private router = inject(Router);
  private authService = inject(AuthService);

  correo: string = '';
  password: string = '';
  mensajeAMostrar: string = '';
  mensajeError: boolean = false;
  sesionIniciada: boolean = false;

  async IniciarSesion() {
    const respuesta: authResponse =
      await this.authService.IniciarSesion(this.correo, this.password);

    if (!respuesta.huboError) {
      this.mensajeError = false;
      this.sesionIniciada = true;
      this.mensajeAMostrar = respuesta.mensajeExito || 'Ingreso correcto';

      setTimeout(() => {
        this.router.navigateByUrl('/home');
        this.correo = '';
        this.password = '';
        this.mensajeAMostrar = '';
      }, 1500);

    } else {
      this.mensajeError = true;
      this.mensajeAMostrar = respuesta.mensajeError || 'Error al iniciar sesión';
      this.password = '';
    }
  }

  // 🔹 Botones de ingreso rápido
  InicioSesionRapido(rol: string) {
    switch (rol) {
      case 'admin':
        this.correo = 'admin@admin.com';
        this.password = '111111';
        break;
      case 'usuario':
        this.correo = 'usuario@usuario.com';
        this.password = '333333';
        break;
      case 'tester':
        this.correo = 'tester@tester.com';
        this.password = '555555';
        break;
      case 'invitado':
        this.correo = 'invitado@invitado.com';
        this.password = "222222";
        break;
      case 'anonimo':
        this.correo = 'anonimo@anonimo.com';
        this.password = "444444";
        break;
    }
  }


}
