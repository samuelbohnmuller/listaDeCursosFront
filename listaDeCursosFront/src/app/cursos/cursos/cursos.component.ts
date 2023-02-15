import { CursosService } from './../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../model/curso';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cursos', //Nome do componente que precisa ser instanciado no HTML para que seu próprio HTML apareça.
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent{

  cursos$: Observable<Curso[]> | null = null //Observable de Array de Curso. Observable é o que será retornado pela requisição.

  constructor(private cursosService: CursosService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar){
    this.atualizar()
  }

  ngOnInit(): void { }

  mensagemDeErro(mensagemDeErro: string) {
    this.dialog.open(ErrorDialogComponent, { //Abro o componente e passo dados para ele, para apresentar na caixa de diálogo.
      data: mensagemDeErro
    });
  }

  adicionaCurso(){
    this.router.navigate(['new'], {relativeTo: this.route}); //new é relacionada a rota onde já estou, se estou em cursos, vai para cursos/new quando clicar no botão que chama esse método.
  }

  editarCurso(curso: Curso){
    this.router.navigate(['editar', curso._id], {relativeTo: this.route}); //Vou para nova rota, passando o curso pelo id.
  }

  removerCurso(curso: Curso){
    const confirmacao = this.dialog.open(ConfirmationDialogComponent, { //Abre a caixa de confirmação de exclusão quando apertar o botão da lixeira.
      data: 'Tem certeza da remoção?',
    });

    confirmacao.afterClosed().subscribe((resultadoDaConfirmacao: boolean) => {
      if(resultadoDaConfirmacao){ //Se clicar em sim, executará a remoção do curso.
        this.cursosService.removerCurso(curso._id).subscribe(
          () => {
            this.atualizar() //Para atualizar apágina já com o registro removido.
            this.snackBar.open('Curso removido', 'X', {
              duration:5000
            })
          },
          error => this.mensagemDeErro('Erro ao deletar curso') //Se der erro.
          )
      }
    });
  }

  atualizar(){ //Atualiza a página.
    this.cursos$ = this.cursosService.listarCursos()
      .pipe(
        catchError(error => {
          this.mensagemDeErro('Erro ao carregar cursos.')
          return of([])
        })
      )
  }

}
