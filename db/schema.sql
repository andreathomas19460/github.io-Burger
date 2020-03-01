
DROP DATABASE db_burger;

CREATE DATABASE db_burger;

USE db_burger;

CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger_name varchar(30) NOT NULL,
  devoured boolean NOT NULL,
  PRIMARY KEY (id)
);