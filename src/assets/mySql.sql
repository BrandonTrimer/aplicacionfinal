/*DROP TABLE IF EXISTS nota;*/

CREATE TABLE IF NOT EXISTS nota(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, contenido TEXT, color TEXT);
INSERT or IGNORE INTO nota(id, titulo, contenido, color) VALUES (1, 'Banco', 'contraseña del banco en caso de perdida asd45','');
INSERT or IGNORE INTO nota(id, titulo, contenido, color) VALUES (2, 'Recoger', 'Ir al colegio a recoger las notas','');
INSERT or IGNORE INTO nota(id, titulo, contenido, color) VALUES (3, 'Tarea', 'Informe de los diferetes tipos de sistemas','');