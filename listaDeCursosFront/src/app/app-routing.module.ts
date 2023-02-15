import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'cursos' //Rota global, ou seja, se tiver apenas http://localhost:4200, farei redirecionamento para rota de cursos, tirando todos os espaços na URL.
  },
  {
    path: 'cursos', //Criada rota de cursos. Quando inserido localhost/cursos carregará o componente cursos.
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule) //Carrega rota de forma automática,indica o módulo da rota e carrega o modulo.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
