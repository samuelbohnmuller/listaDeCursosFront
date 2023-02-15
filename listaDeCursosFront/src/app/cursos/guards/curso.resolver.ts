import { CursosService } from './../services/cursos.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver implements Resolve<Curso> {

  constructor(private service: CursosService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> { //Pega informações dos parâmetros da rota.
    if(route.params && route.params['id']){ //Se a rota tem parâmetros e se o parâmetro é id.
      return this.service.listarCursoPeloId(route.params['id']) //Retorna os dados pela API pelo parâmetro de id.
    }
    return of({_id: '', name: '', category: ''}); //Quando for um novo registro, será inicializado com os campos vazios. O od retorna um Observable de Curso.
  }
}
