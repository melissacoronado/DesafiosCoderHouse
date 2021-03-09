PRIMERA ENTREGA DEL PROYECTO FINAL

Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>>Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el middleware express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

>>Aspectos a incluir en el entregable: 
1.- El router base '/productos' implementará cuatro rutas:
'/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
'/agregar' : Para incorporar productos al listado (disponible para administradores)
'/actualizar/:id' : Actualiza un producto por su id (disponible para administradores)
'/borrar/:id' : Borra un producto por su id (disponible para administradores)
2.- El router base '/carrito' implementará tres rutas:
'/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un producto por su id de carrito (disponible para usuarios y administradores)
'/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto (disponible para usuarios y administradores)
'/borrar/:id' : Eliminar un producto del carrito por su id de carrito (disponible para usuarios y administradores)
3.- Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada}
4.- Un producto dispondrá de los siguientes campos:  id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
5.- El carrito de compras tendrá la siguiente estructura: 
id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
6.- El timestamp puede implementarse con Date.now()
7.- Comenzar a trabajar con el listado de productos y el carrito de compras en memoria del servidor, luego persistirlos en el filesystem.

