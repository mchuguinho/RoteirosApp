import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'roteiro/:id',
    loadChildren: () => import('./roteiro/roteiro.module').then( m => m.RoteiroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registo',
    loadChildren: () => import('./registo/registo.module').then( m => m.RegistoPageModule)
  },
  {
    path: 'route-add',
    loadChildren: () => import('./route-add/route-add.module').then( m => m.RouteAddPageModule)
  },
  {
    path: 'add-ponto-int',
    loadChildren: () => import('./add-ponto-int/add-ponto-int.module').then( m => m.AddPontoIntPageModule)
  },
  {
    path: 'biblio',
    loadChildren: () => import('./biblio/biblio.module').then( m => m.BiblioPageModule)
  },
  {
    path: 'discovery',
    loadChildren: () => import('./discovery/discovery.module').then( m => m.DiscoveryPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
