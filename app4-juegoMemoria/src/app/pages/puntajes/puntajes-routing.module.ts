import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntajesPage } from './puntajes.page';

const routes: Routes = [
  {
    path: '',
    component: PuntajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntajesPageRoutingModule {}
