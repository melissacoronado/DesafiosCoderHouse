import { Socket } from 'dgram';
import express, {Application, Request, Response} from 'express'
import path from 'path'
import { RouterApiProductos } from './rutas/ApiProductosRoute';
import { RouterViewsProductos } from './rutas/viewsRoute';

const handlebars = require('express-handlebars');
const app:Application = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })

import { IProd, Producto } from './bd'
export let opsProd = new Producto()

let puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));



//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir: path.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/public/views/layouts/'),
}));
app.set('views', path.resolve(__dirname + '/public/views/')); 
app.set('view engine', 'hbs');

//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);

http.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
     
}).on("error", (err: any)=>{
    console.log(err)
})



io.on('connection', (socket: any) => {
    let idSock = socket.id
    console.log('A user connected' + socket.id);

    //chat
    socket.on('New chatMsg', (data: any) => {

        //Agregar usuario- asociar correo con socket.id

        //Guardar en el archivo txt

        //Emit para mostrar en la lista
        let retorno = {
            mail: data.mail,
            message: data.msg,
            timeMessage: data.time
        }
        //opsProd.addProduct(newProduct)
        io.emit('new message', retorno);
    });

    //Productos
    socket.on('dataProds', (data: any) => {
        const { title, price, thumbnail } = data  
        const newProduct = { title, price, thumbnail }
        opsProd.addProduct(newProduct)
        io.emit('ProductoAgregado', data);
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});