import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'pagina1',
    loadChildren: () => import('./pages/pagina1/pagina1.module').then( m => m.Pagina1PageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'notas/:id/:titulo/:contenido',
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'notas-nube',
    loadChildren: () => import('./pages/notas-nube/notas-nube.module').then( m => m.NotasNubePageModule)
  },
  {
    path: 'notas-nubedatos',
    loadChildren: () => import('./pages/notas-nubedatos/notas-nubedatos.module').then( m => m.NotasNubedatosPageModule)
  },
  {
    path: 'notas-nubedatos/:id/:titulo/:contenido',
    loadChildren: () => import('./pages/notas-nubedatos/notas-nubedatos.module').then( m => m.NotasNubedatosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
