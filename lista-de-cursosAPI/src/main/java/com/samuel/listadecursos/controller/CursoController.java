package com.samuel.listadecursos.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.samuel.listadecursos.model.Curso;
import com.samuel.listadecursos.repository.CursoRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cursos")
public class CursoController {

    @Autowired //Injeção de dependência para conexão com o banco.
    private CursoRepository cursoRepository;

    @GetMapping()
    public List<Curso> listarCursos(){
        return cursoRepository.findAll(); //Retorna do banco todos os registros.
    }

    @GetMapping("/{id}") //id na URL.
    public ResponseEntity<Curso> listarCursoPeloId(@PathVariable Long id){ //Recebo qual id na chamada do método. id deve ser o mesmo nome do atributo de Curso. Retorna uma resposta do tipo Curso.
        return cursoRepository.findById(id)
            .map(retorno -> ResponseEntity.ok().body(retorno)) //Se retornar algo do banco, mostro o retorno na resposta.
            .orElse(ResponseEntity.notFound().build()); //Se não, mando cod 404.
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED) //Retorno um Curso para aparecer na resposta o json com o status 201.
    public Curso criarCurso(@RequestBody @Valid Curso curso){ //No corpo da requisição é mostrado os atributos na aba Payload, onde foi preecnhido pelo usuário nos campos. Será mapeado esses atributos com os atributos de Curso.
        return cursoRepository.save(curso); //Salva os atributos preenchidos pelo usuário nos campos do formulário no banco de dados. 
    }

    @PutMapping("/{id}") //Atualiza curso.
    public ResponseEntity<Curso> atualizarCurso(@PathVariable Long id, @RequestBody @Valid Curso curso){ //Pega o id na URL e le os atributos no corpo da requisição e transforma em uma instancia de Curso.
        return cursoRepository.findById(id) //Primeiro verifico se o curso com o id existe.
            .map(cursoRetornado -> {
                cursoRetornado.setName(curso.getName());
                cursoRetornado.setCategory(curso.getCategory());
                Curso cursoAtualizado = cursoRepository.save(cursoRetornado); //Salvo o curso atualizado no banco(atualizo no caso, no registro de mesmo ID).
                return ResponseEntity.ok().body(cursoAtualizado); //Retorna no corpo da requisição o curso atualizado.
            }) 
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarCurso(@PathVariable Long id){ //Digo que retorna um objeto, não dando erro no delete que não retorna nada.
        return cursoRepository.findById(id)
            .map(cursoRetornado -> {
                cursoRepository.deleteById(id);
                return ResponseEntity.noContent().build(); //Como o delete não retorna nada, digo que não retorna nada.
            }) 
            .orElse(ResponseEntity.notFound().build());
    }
    
}
