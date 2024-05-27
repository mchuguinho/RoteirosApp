import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoteiroPage } from './roteiro.page';

const routes: Routes = [
  {
    path: '',
    component: RoteiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoteiroPageRoutingModule {}
