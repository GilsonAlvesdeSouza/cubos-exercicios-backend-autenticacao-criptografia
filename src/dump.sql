create database catalogo_pokemons;

create table usuarios(
	id serial primary key,
	nome varchar(100) not null,
	email varchar(150) not null unique,
	senha varchar(100) not null 
);

create table pokemons (
	id serial primary key,
	usuario_id int not null,
	nome varchar(100) not null,
	habilidades varchar(100) not null,
	imagem varchar(150),
	apelido varchar(100) 
);

alter table pokemons add constraint FK_USUARIOS_POKEMONS
foreign key(usuario_id) references usuarios(id);