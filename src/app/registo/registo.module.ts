import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistoPageRoutingModule } from './registo-routing.module';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { RegistoPage } from './registo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistoPage, ConfirmModalComponent]
})
export class RegistoPageModule {}
