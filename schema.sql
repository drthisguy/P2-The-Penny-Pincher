DROP DATABASE Finances_db;

CREATE DATABASE Finances_db;

USE Finances_db;

CREATE TABLE categories (
    id INT AUTO_INCREMENT,
    name VARCHAR (30),
    priority ENUM("low", "medium", "high"),
	PRIMARY KEY (id)

);


CREATE TABLE expenses (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    mandatory TINYINT(1), 
    amount DECIMAL (5,2),
    category_id INT REFERENCES categories(id),
	PRIMARY KEY (id)

);

