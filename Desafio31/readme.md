--------------------------Desafio 31------------------------------
Formato: link a un repositorio en Github con el proyecto cargado. 
Sugerencia: no incluir los node_modules

>> Consigna:
1.- Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.
2.- Utilizar como registro de la aplicación de backend eligiendo el logger que más les guste: log4js, winston o pino log4js. 
    - Elegir un módulo del servidor para reemplazar los console.log por las funciones de logger, seleccionando el detalle de log entre 3 niveles:  info, warning y error utilizando el siguiente criterio:
    - Loggear todos los niveles a consola (info, warning y error)
    - Registrar sólo los logs de warning a un archivo llamada warn.log
    - Enviar sólo los logs de error a un archivo llamada error.log

