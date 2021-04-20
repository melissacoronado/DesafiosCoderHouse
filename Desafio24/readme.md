--------------------------Desafio24------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: 
Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permita loguear un cliente por su nombre, mediante un formulario de ingreso.
Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.
Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.
>> Ejemplos:  Se adjuntan tres screenshoot con las vistas anteriormente mencionadas.
