import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasPropiasPageRoutingModule } from './cosas-propias-routing.module';

import { CosasPropiasPage } from './cosas-propias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasPropiasPageRoutingModule
  ]

})
export class CosasPropiasPageModule {}
