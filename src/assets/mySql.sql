DROP TABLE IF EXISTS nota;

CREATE TABLE IF NOT EXISTS nota(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, contenido TEXT);
INSERT or IGNORE INTO nota(id, titulo, contenido) VALUES (1, 'Banco', 'contraseña del banco en caso de perdida asd45');
INSERT or IGNORE INTO nota(id, titulo, contenido) VALUES (2, 'Recoger', 'Ir al colegio a recoger las notas');
INSERT or IGNORE INTO nota(id, titulo, contenido) VALUES (3, 'Tarea', 'Informe de los diferetes tipos de sistemas');