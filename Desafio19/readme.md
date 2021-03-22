Formato: archivo de texto con las consultas realizadas y la carpeta de la base de datos comprimida en un zip. 
Sugerencia: Si es un archivo en línea, configurar los permisos de acceso.

>> Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

1.- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 
2.- Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 
3.- Listar todos los documentos en cada colección.
4.- Mostrar la cantidad de documentos almacenados en cada una de ellas.
5.- Realizar un CRUD sobre la colección de productos:
  a.- Agregar un producto más en la colección de productos 
  b.- Realizar una consulta por nombre de producto específico:
    i.- Listar los productos con precio menor a 1000 pesos.
    ii.- Listar los productos con precio entre los 1000 a 3000 pesos.
    iii.- Listar los productos con precio mayor a 3000 pesos.
    iv.- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
  c.-Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
  d.- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
  e.- Borrar los productos con precio menor a 1000 pesos 
6.- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
