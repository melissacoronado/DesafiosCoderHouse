--------------------------Desafio 41------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: Sobre el proyecto del último desafío entregable: 
Modificar la capa de persistencia incorporando el concepto de DAO y DTO.
Crear un DAO por cada tipo de persistencia que exista en el proyecto (MongoDB, MySQL, Memory, File, etc).

El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente)será devuelto por una Factory para que la capa de negocio opere con el.
Al menos deben existir dos DAOs (Memory ó File para operaciones de debug y DB para base de datos en producción). En el caso de las operaciones de los DAOs en Memory ó File incorporar el ID y la FyH al objeto persistido con DTO.
Los DAOs deben presentar la misma interface hacia la lógica de negocio de nuestro servidor.
Utilizar el patrón Repository para gestionar la información que maneja el canal de chat con Websockets, para almacenar y recuperar los mensajes del sistema de almacenamiento utilizado.



