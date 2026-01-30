import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoUsuariosPageRoutingModule } from './listado-usuarios-routing.module';

import { ListadoUsuariosPage } from './listado-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoUsuariosPageRoutingModule
  ]
})
export class ListadoUsuariosPageModule {}
