Formato: Dos documentos HTML con JS interno, con los nombres “FC+ApellidoNombre” “C+ApellidoNombre” para consignas 1 y 2.
Sugerencia: Utilizar live server en VSC y la consola del navegador.

>> Consigna: 
1) Declarar una función constructora llamada Usuario que reciba: nombre (string), apellido (string), libros (array de objetos) y mascotas (array de strings). 
Implementar las propiedades instancia desde los valores recibidos como argumento y los siguientes métodos en su prototipo:
getFullName: debe retornar un string con el nombre y apellido del usuario. (utilizar template string).
addMascota: debe agregar una mascota (mascota) al arreglo de mascotas del usuario. no debe retornar nada.
getMascotas: debe retornar la cantidad de mascotas que tiene el usuario.

>> Consigna: 
addBook: recibe un string 'book' y un string 'autor' y debe agregar un objeto: { nombre: book, autor: autor} al arreglo de libros del usuario. No debe retornar nada.      
getBooks: debe retornar un arreglo con sólo los nombres del arreglo de libros del usuario.  
Crear un objeto llamado usuario a partir de la función constructora, con valores que permitan probar todos sus métodos. Hacer el test completo empleando la consola del navegador.

2) Realizar todo lo anterior utilizando el constructor class de ES6

>>Aspectos a incluir en el entregable:
Se debe proporcionar el código completo dentro de un script interno en dos documentos HTML: uno para la resolución con la función constructora y el otro con class.

>>Ejemplo:
getMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato'] usuario.getMascotas() debería devolver 2.
getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}] usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].
getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk' usuario.getFullName() deberia devolver 'Elon Musk'
