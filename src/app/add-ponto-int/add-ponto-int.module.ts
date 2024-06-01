import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPontoIntPageRoutingModule } from './add-ponto-int-routing.module';

import { AddPontoIntPage } from './add-ponto-int.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    AddPontoIntPageRoutingModule
  ],
  declarations: [AddPontoIntPage]
})
export class AddPontoIntPageModule {}
