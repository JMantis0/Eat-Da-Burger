DROP DATABASE IF EXISTS sandwich_db;
CREATE DATABASE sandwich_db;

USE sandwich_db;

CREATE TABLE sandwiches
(
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
