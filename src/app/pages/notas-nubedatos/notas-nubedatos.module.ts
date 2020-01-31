import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasNubedatosPageRoutingModule } from './notas-nubedatos-routing.module';

import { NotasNubedatosPage } from './notas-nubedatos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasNubedatosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NotasNubedatosPage]
})
export class NotasNubedatosPageModule {}
