import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteAddPageRoutingModule } from './route-add-routing.module';

import { RouteAddPage } from './route-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteAddPageRoutingModule
  ],
  declarations: [RouteAddPage]
})
export class RouteAddPageModule {}
