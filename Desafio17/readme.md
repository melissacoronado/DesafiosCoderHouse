--------------------------Desafio23------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: 
Sobre el desafío entregable de la clase anterior, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
El nuevo formato de mensaje será:

        var mensaje = { 
            author: {
                id: 'mail del usuario', 
                nombre: 'nombre del usuario', 
                apellido: 'apellido del usuario', 
                edad: 'edad del usuario', 
                alias: 'alias del usuario',
                avatar: 'url avatar (foto, logo) del usuario'
            },
            text: 'mensaje del usuario'
        }

>> Aspectos a incluir en el entregable: 
1.- El mensaje se envía del frontend hacia el backend, el cual lo almacenará en el base de datos. Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista. 
2.- El array debe estar normalizado con normalizr, conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo).
3.- El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.
4.- Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:
const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'});
En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. Más info en la web oficial.  
5.- Presentar en el frontend (a modo de test) el porcentaje de compresión de los mensajes recibidos. Puede ser en el título del centro de mensajes.

>> Nota: incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js
Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo:  new normalizr.schema.Entity , normalizr.denormalize(...,...,...)


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



