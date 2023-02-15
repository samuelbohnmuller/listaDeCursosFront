import { CursoResolver } from './guards/curso.resolver';
import { CursosComponent } from './cursos/cursos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { CursoFormComponent } from './curso-form/curso-form.component';

const routes: Routes = [
  {
    path: '', component: CursosComponent //Caminho da rota e o componente dela.
  },
  {
    path: 'new', component: CursoFormComponent, resolve:{cursoResolver: CursoResolver} //resolver é para quando adicionar novo curso, os campos venham vazios. Ele não tem parâmetro(/id) então os campos vem vazios para novo curso.
  },
  {
    path: 'editar/:id', component: CursoFormComponent, resolve:{cursoResolver: CursoResolver} //rota com id com resolver para mostrar curso a ser editado no formulário.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
