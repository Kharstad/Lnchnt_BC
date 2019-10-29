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
  },
  {
    path: 'cadastro-cliente',
    loadChildren: () => import('./cadastro-cliente/cadastro-cliente.module').then(m => m.CadastroClientePageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro-cliente', loadChildren: './cadastro-cliente/cadastro-cliente.module#CadastroClientePageModule' },
  { path: 'add-lanche', loadChildren: './add-lanche/add-lanche.module#AddLanchePageModule' },
  { path: 'sobre-nos', loadChildren: './sobre-nos/sobre-nos.module#SobreNosPageModule' },
  { path: 'list-usuario', loadChildren: './list-usuario/list-usuario.module#ListUsuarioPageModule' },  { path: 'perfil-lanche', loadChildren: './perfil-lanche/perfil-lanche.module#PerfilLanchePageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
