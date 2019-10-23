import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'cadastro-cliente', loadChildren: './pages/cadastro-cliente/cadastro-cliente.module#CadastroClientePageModule' },
  { path: 'add-lanche', loadChildren: './pages/add-lanche/add-lanche.module#AddLanchePageModule' },
  { path: 'sobre-nos', loadChildren: './pages/sobre-nos/sobre-nos.module#SobreNosPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
