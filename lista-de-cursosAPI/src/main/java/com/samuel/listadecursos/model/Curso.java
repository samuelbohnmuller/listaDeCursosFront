package com.samuel.listadecursos.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data //Gera get e set.
@Entity //Entidade/tabela no banco
public class Curso {

    @Id @JsonProperty("_id") @GeneratedValue(strategy = GenerationType.AUTO) //Json transforma o json em _id.
    private Long id;
    @NotNull @NotBlank @Length(min = 2, max = 100)
    @Column(length = 100, nullable = false)
    private String name;
    @NotNull @Pattern(regexp = "Back-end|Front-end")
    @Column(length = 10, nullable = false)
    private String category;

    
}
