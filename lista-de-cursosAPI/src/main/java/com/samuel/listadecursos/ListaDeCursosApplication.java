package com.samuel.listadecursos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.samuel.listadecursos.model.Curso;
import com.samuel.listadecursos.repository.CursoRepository;

@SpringBootApplication
public class ListaDeCursosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListaDeCursosApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CursoRepository cursoRepository) {
		return args -> {
			cursoRepository.deleteAll();

			Curso c = new Curso();
			c.setName("Angular com Spring");
			c.setCategory("Front-end");

			cursoRepository.save(c);
		};
	}

}
