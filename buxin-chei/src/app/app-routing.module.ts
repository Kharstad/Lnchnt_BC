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
  },  { path: 'cadastro-cliente', loadChildren: './pages/cadastro-cliente/cadastro-cliente.module#CadastroClientePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'add-lanche', loadChildren: './pages/add-lanche/add-lanche.module#AddLanchePageModule' },
  { path: 'sobre-nos', loadChildren: './pages/sobre-nos/sobre-nos.module#SobreNosPageModule' }

<<<<<<< HEAD
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'perfil-lanche/:id',
    loadChildren: () => import('./perfil-lanche/perfil-lanche.module').then(m => m.PerfilLanchePageModule)
  },
  {
    path: 'perfil-usuario/:id',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro-cliente', loadChildren: './cadastro-cliente/cadastro-cliente.module#CadastroClientePageModule' },
  { path: 'add-lanche', loadChildren: './add-lanche/add-lanche.module#AddLanchePageModule' },
  { path: 'sobre-nos', loadChildren: './sobre-nos/sobre-nos.module#SobreNosPageModule' },
  { path: 'list-usuario', loadChildren: './list-usuario/list-usuario.module#ListUsuarioPageModule' },
  { path: 'perfil-lanche', loadChildren: './perfil-lanche/perfil-lanche.module#PerfilLanchePageModule' },
  { path: 'perfil-usuario', loadChildren: './perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
=======
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
>>>>>>> e3411243728b1755e05963c0082a9bfe33d54e54
