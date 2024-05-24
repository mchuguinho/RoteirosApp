import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPontoIntPage } from './add-ponto-int.page';

const routes: Routes = [
  {
    path: '',
    component: AddPontoIntPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPontoIntPageRoutingModule {}
