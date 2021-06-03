--------------------------Desafio 35------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna: Realizar los siguientes cambios sobre el proyecto en el que venimos trabajando:

1.- El sistema debe enviar un mail, utilizando una cuenta de ethereal, que indique cuando un usuario se loguea (a través de la red social implementada anteriormente: de aquí en más Facebook). Así mismo debe proceder de la misma forma al desloguerse el usuario. 
2.- En ambos casos, el asunto del mail debe describir la operación (log in, log out) y el nombre del usuario junto a la fecha y hora del evento.
3.- Además, al momento del logueo se debe enviar un email similar, utilizando gmail como servidor de correo, a la cuenta de email registrada en Facebook ó alguna otra elegida. Se debe adjuntar la foto de perfil de la red social Facebook en el envío.
4.- El servidor también enviará un SMS a un número elegido, cada vez que reciba un mensaje con la palabra 'administrador' en el canal de chat, indicando quién lo envió y el texto completo del mensaje.
5.- En todos los casos revisar las distintas casillas de email verificando que los mails lleguen con los datos pedidos. También debe llegar de manera apropiada el SMS al celular indicado, revisar la consola de Twilio para validar el mensaje.
