import { Curso } from './../model/curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, first, of, tap } from 'rxjs';
import { CursosComponent } from '../cursos/cursos.component';

@Injectable({ //Para ser injetado como dependência em outros componentes.
  providedIn: 'root'
})
export class CursosService { //Conexão para API.

  private API = 'api/cursos' //Caminho da API.

  constructor(private httpClient: HttpClient) { }

  listarCursos(){ //Tipo do método é Array de Curso.
    return this.httpClient.get<Curso[]>(this.API) //Retorna um json do tipo Array de Curso da API.
      .pipe( //Manipulo os dados com pipe.
        first(), //Finalizo a requisição.
        delay(1000)
      )
  }

  listarCursoPeloId(id: string){ //atributo id é string.
    return this.httpClient.get<Curso>(`${this.API}/${id}`) //Busco na API o curso pelo id.
  }

  salvarCurso(curso: Partial<Curso>){ //Aceita receber na chamada do método, objeto com ao menos 1 campo da interface Curso. O id não será passado no formulário.
    if(curso._id){ //Se o curso tiver id, atualiza o curso existente.
      return this.atualizarCurso(curso)
    } //Se não, cria curso novo.
    return this.criarCurso(curso)
  }

  private criarCurso(curso: Partial<Curso>){
    return this.httpClient.post<Curso>(this.API, curso).pipe(first()) //Passo o endereço e o dado que mando para API(retorna um Observable).
  }

  private atualizarCurso(curso: Partial<Curso>){
    return this.httpClient.put<Curso>(`${this.API}/${curso._id}`, curso).pipe(first()) //Atualiza o curso com o identificador(id) do registro.
  }

  removerCurso(id: string){ //Deleta curso pelo id.
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
  }
}
