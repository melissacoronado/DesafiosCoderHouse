--------------------------Desafio22------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: 
1.- Sobre el desafío entregable de la clase número 20, crear una ruta 'productos/vista-test' que permita mostrar productos generados al azar en forma de tabla (similar a lo realizado sobre la ruta 'productos/vista').
2.- Los productos se generarán utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’: nombre, precio y foto.
3.- Considerar pasar por query params la cantidad de productos a generar: Ej. 'productos/vista-test?cant=5'. De no pasar ningún valor, producirá 10 objetos.
4.- Verificar la generación de productos aleatorios utilizando distintas cantidades. Comprobar que para cantidad 0 indique que no hay productos.


--------------------------Desafio20------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: 
1.- Sobre el desafío entregable de la clase número 17, almacenar los mensajes en una base de datos MongoDB llamada ‘ecommerce’ dentro de una colección ‘mensajes’.
2.- Cambiar la capa de persistencia de la Api Rest de productos por un servicio de base de datos MongoDB. 
3.- La base de datos a utilizar será ‘ecommerce’, colección ‘productos’.

>> Notas:
- Utilizar la dependencia Mongoose para interactuar con la base de datos


--------------------------Desafio17------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: Sobre el desafío entregable de la última clase, cambiar la persistencia de los mensajes en el filesystem por persistencia en base de datos SQLite3.

>> Notas:
- Definir una carpeta DB para almacenar la base datos SQLite3 llamada mensajes y crear por programa la tabla de mensajes dentro de esta base si no existe.
- Utilizar la dependencia Knex para interactuar con la base de datos



