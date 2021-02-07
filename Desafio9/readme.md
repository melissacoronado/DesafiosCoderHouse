Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna:  Sobre el proyecto entregable de la clase anterior, incorporar las siguientes rutas:
Actualizar un producto (put) : '/api/productos/actualizar/:id' -> devuelve producto actualizado
Borrar un producto (delete) : '/api/productos/borrar/:id' -> devuelve producto eliminado

El formato del objeto a actualizar será
{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}

>> Aspectos a incluir en el entregable:
Implementar las rutas put y delete junto a las funciones necesarias (utilizar la estructura ya creada).
Incorporar el Router de express en la url base '/api' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
Probar la funcionalidad con Postman y el formulario de ingreso de datos.

