CREATE DATABASE prueba;

create table items(
   id INT NOT NULL AUTO_INCREMENT,
   nombre VARCHAR(50) NOT NULL,
   categoria VARCHAR(50) NOT NULL,
   stock INT unsigned NOT NULL,
   
   PRIMARY KEY (id)
);

INSERT INTO items (nombre, categoria, stock)
VALUES('Fideos','Harina',20);

INSERT INTO items (nombre, categoria, stock)
VALUES('Leche','Lacteos',30);

INSERT INTO items (nombre, categoria, stock)
VALUES('Crema','Lacteos',15);

SELECT * FROM items;

DELETE FROM items WHERE id = 1;

UPDATE items SET STOCK = 45 WHERE id = 2;

SELECT * FROM items;
