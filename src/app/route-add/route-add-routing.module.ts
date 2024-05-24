import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAddPage } from './route-add.page';

const routes: Routes = [
  {
    path: '',
    component: RouteAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteAddPageRoutingModule {}
