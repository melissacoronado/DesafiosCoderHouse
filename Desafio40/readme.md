--------------------------Desafio 40------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna:  Separar en capas el proyecto que venimos realizando, exponiendo la capa de ruteo, el controlador, la lógica de negocio con los casos de uso y la capa de persistencia. 

Crear una factory que permita elegir con qué sistema de almacenamiento voy a trabajar (MongoDB, MySQL, File, Memory, etc), tomando la opción de la línea de comandos.

Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.

Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.


