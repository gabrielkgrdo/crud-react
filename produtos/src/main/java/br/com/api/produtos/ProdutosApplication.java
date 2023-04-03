package br.com.api.produtos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.repositorio.ProdutoRepositorio;

@SpringBootApplication
public class ProdutosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProdutosApplication.class, args);
	}

	@Bean
	CommandLineRunner initDataBase(ProdutoRepositorio produtoRepositorio) {
		return args -> {
			produtoRepositorio.deleteAll();

			ProdutoModelo pModelo = new ProdutoModelo();
			pModelo.setMarca("Samsung");
			pModelo.setNome("Galaxy S23 Ultra");

			produtoRepositorio.save(pModelo);
		};
	}

}
