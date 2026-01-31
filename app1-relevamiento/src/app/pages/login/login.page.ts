import { Component, inject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, authResponse } from '../../services/auth.service';
import {IonInput,IonFab,IonFabList,IonIcon,IonFabButton,IonContent, IonItem,IonButton, IonCardHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
//import { NgModule } from '@angular/core';
import { CustomLoader } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports:[FormsModule, IonFab,IonFabButton,IonContent,IonItem,IonButton,IonInput,IonCardHeader, CommonModule,IonIcon,IonFabList]
})
export class LoginPage {

   private router = inject(Router);
  private authService = inject(AuthService);
  private customLoader = inject(CustomLoader);

  correo: string = '';
  password: string = '';
  mensajeAMostrar: string = '';
  mensajeError: boolean = false;
  sesionIniciada: boolean = false;
usuariosRapidos = [
  { id: 1, correo: 'admin@admin.com', clave: '111111', perfil: 'admin' },
  { id: 2, correo: 'invitado@invitado.com', clave: '222222', perfil: 'invitado' },
  { id: 3, correo: 'usuario@usuario.com', clave: '333333', perfil: 'usuario' },
  { id: 4, correo: 'anonimo@anonimo.com', clave: '444444', perfil: 'anonimo' },
  { id: 5, correo: 'tester@tester.com', clave: '555555', perfil: 'tester' }
];

loginRapido(id: number) {
  const usuario = this.usuariosRapidos.find(u => u.id === id);
  if (!usuario) return;

  this.correo = usuario.correo;
  this.password = usuario.clave;

  // Opcional: auto login
  //this.IniciarSesion();
}

  async IniciarSesion() {
    
    this.customLoader.show('Verificando credenciales...');
  
  const respuesta: authResponse = await this.authService.IniciarSesion(this.correo, this.password);
  
  this.customLoader.hide(); // Ocultar inmediatamente al recibir respuesta

  if (!respuesta.huboError) {
    this.mensajeError = false;
    this.sesionIniciada = true;
    this.mensajeAMostrar = respuesta.mensajeExito || 'Acceso concedido';

    // Navegación inmediata o con delay corto
    setTimeout(() => {
      // ⚠️ IMPORTANTE: Verifica en tu app-routing.module.ts si es 'home' o 'principal'
      this.router.navigate(['/home']); 
    }, 1000);
    
  } else {
    this.mensajeError = true;
    this.mensajeAMostrar = respuesta.mensajeError || 'Error de autenticación';
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
    }
  }
}
