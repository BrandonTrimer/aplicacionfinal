import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasNubePage } from './notas-nube.page';

const routes: Routes = [
  {
    path: '',
    component: NotasNubePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasNubePageRoutingModule {}
