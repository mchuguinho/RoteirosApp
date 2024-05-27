import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoteiroPageRoutingModule } from './roteiro-routing.module';

import { RoteiroPage } from './roteiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoteiroPageRoutingModule
  ],
  declarations: [RoteiroPage]
})
export class RoteiroPageModule {}
