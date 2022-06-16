CREATE DATABASE db_gestion;

use db_gestion;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

CREATE TABLE formularios(
    id INT(11) NOT NULL,
    Nombredelproyecto VARCHAR(100) NOT NULL,
    fechainicio DATE(16) NOT NULL,
    fechatermino DATE(16) NOT NULL,
    radio VARCHAR(16) NOT NULL,
    metrica1 VARCHAR(16) NOT NULL,
    metrica2 VARCHAR(16) NOT NULL,
    metrica3 VARCHAR(16) NOT NULL,    
    menu VARCHAR(16) NOT NULL,
    checkbox VARCHAR(16) NOT NULL,
    descripcion TEXT NOT NULL,
    users_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_users FOREIGN KEY(users_id) REFERENCES users(id)
);
ALTER TABLE formularios
    ADD PRIMARY KEY (id);

ALTER TABLE formularios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

  