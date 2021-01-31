Formato: link a un repositorio en Github con el proyecto cargado.. 
Sugerencia: no incluir los node_modules

>> Consigna: Realizar un proyecto de servidor basado en node.js que utilice el middleware express e implemente tres endpoints en el puerto 8080:
Ruta get '/items' que responda un objeto con todos los productos y su cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad productos) }
Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de productos que se encuentran en el archivo 'productos.txt'. El formato de respuesta será: { item: {producto} }
La ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 y cuantas la ruta del punto 2. Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }

Usar 'productos.txt' del desafío anterior. Ej:
[
  {
    "title": "Escuadra",
    "price": 123.45,
    "guid": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
  },
  {
    "title": "Calculadora",
    "price": 234.56,
    "guid": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
  },
  {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "guid": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
  }
]

>> Aclaraciones: 
Utilizar import para importar las dependencias necesarias.
Representar por consola el puerto de conexión del servidor y mensajes de error si los hubiese.



b
