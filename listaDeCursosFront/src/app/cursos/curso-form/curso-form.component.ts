import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Curso } from '../model/curso';


@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit{



  constructor(private formBuilder: NonNullableFormBuilder, private cursosService: CursosService, private snackBar: MatSnackBar, private location: Location, private activatedRoute: ActivatedRoute){}

  form = this.formBuilder.group({
    _id: [''], //Não é renderizado no HTML, mas é importante para distinguir cada registro.
    name: ['', [Validators.required, Validators.maxLength(100)]], //Mesmo nome dos campos da interface Curso e que virão da API. O campo é do tipo string e já inicializo com vazio não podendo ser nulo pois é NonNullableFormBuilder.
    category: ['', [Validators.required]] //Será usado no HTML do componente(Grupo de campos).
  })

  ngOnInit(): void {
    const curso: Curso = this.activatedRoute.snapshot.data['cursoResolver'] //Variável cursoResolver deve ter o mesmo nome que colocado no path da rota de editar(resolve:{cursoResolver: CursoResolver). Recebe o objeto por id na API pelo resolver de nome cursoResolver.
    this.form.setValue({ //Seto nos campos do formulário os valores pegos no resolver na variável curso.
      _id: curso._id,
      name: curso.name, //Nomes dos campos no formulário recebem os valores do curso pego na API.
      category: curso.category
    })
  }

  salvarCurso(){
    this.cursosService.salvarCurso(this.form.value) //Salva o valor dos campos do formulário.
      .subscribe(resultado => {this.caixaMensagemDeSucesso()},
        error => {this.caixaMensagemDeErro()}) //Apresenta caixinha com mensagem de erro na tela.
  }

  cancelar(){
    this.location.back() //Volta para a página anterior.
  }

  caixaMensagemDeSucesso(){
    this.snackBar.open('Curso salvo', '', {duration: 4000})
    this.cancelar()
  }

  caixaMensagemDeErro(){
    this.snackBar.open('Erro ao salvar curso', '', {duration: 4000})
  }

  erroMensagem(campo: string){
    const field = this.form.get(campo) //Pego o campo para aplicar validações.

    if(field?.hasError('required')){ //Se tiver erro de obrigatoriedade, retorna mensagem.
      return 'Campo obrigatório para habilitar o botão'
    }

    if(field?.hasError('maxlength')){ //Se tiver erro de obrigatoriedade, retorna mensagem.
      const requiredLenght = field.errors ? field.errors['maxlength']['requiredLength']: 20 //Obtém o erro se existe e põe o tamanho requerido.
      return `Tamanho excedito de ${requiredLenght} caracteres.`
    }

    return 'Campo inválido'
  }

}
