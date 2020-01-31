import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasNubedatosPage } from './notas-nubedatos.page';

const routes: Routes = [
  {
    path: '',
    component: NotasNubedatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasNubedatosPageRoutingModule {}
