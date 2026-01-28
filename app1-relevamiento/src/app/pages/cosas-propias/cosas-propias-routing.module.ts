import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasPropiasPage } from './cosas-propias.page';

const routes: Routes = [
  {
    path: '',
    component: CosasPropiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasPropiasPageRoutingModule {}
