package com.samuel.listadecursos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samuel.listadecursos.model.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long>{
    
}
