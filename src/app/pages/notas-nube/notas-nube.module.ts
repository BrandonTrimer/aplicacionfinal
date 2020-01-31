import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasNubePageRoutingModule } from './notas-nube-routing.module';

import { NotasNubePage } from './notas-nube.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasNubePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NotasNubePage]
})
export class NotasNubePageModule {}
