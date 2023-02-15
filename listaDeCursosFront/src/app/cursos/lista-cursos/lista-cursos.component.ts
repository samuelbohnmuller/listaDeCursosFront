import { Curso } from '../model/curso';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit{

@Input() cursos: Curso[] = [] //Valores nessa variável poderão ser acessadas no HTML com essa variável pelo Input().
@Output() adicionar = new EventEmitter(false) //Valores que estão saindo da variável e funções e emite evento. False pois não é assíncrono.
@Output() editar = new EventEmitter(false)
@Output() deletar = new EventEmitter(false)

readonly listaDeColunas = ['name', 'category', 'acoes'] //Indico no array de string qual as propridades que  estarão nas colunas da tabela no HTML.

constructor(){}

  ngOnInit(): void {
  }

  adicionarCurso(){
    this.adicionar.emit(true) //Quando clicado em elemento que possua esse método, irá emitir evento. True é apenas para mostrar que foi clicado.
  }

  editarCurso(curso: Curso){
    this.editar.emit(curso) //Emito um evento para quem estiver escutando.
  }

  removerCurso(curso: Curso){
    this.deletar.emit(curso)
  }

}


