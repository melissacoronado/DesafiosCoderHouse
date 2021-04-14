import { Socket } from 'dgram';
import express, {Application, Request, Response} from 'express'
import path from 'path'
import { RouterApiProductos } from './rutas/ApiProductosRoute';
import { RouterViewsProductos } from './rutas/viewsRoute';
import { IProd, Producto } from './bd/productos'
import { IChat, ChatMsg } from './bd/mensajes'
import { normalize, schema } from 'normalizr';
const db = require('./bd/bd')

const handlebars = require('express-handlebars');
const app:Application = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })


let opsProd = new Producto()
let opsChat = new ChatMsg();

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


//Desafio23
/*const authorSchema = new schema.Entity('author');
const postSchema = new schema.Entity('mensaje', {
    author: authorSchema
  });*/
  // Data about author will be stored in 'authors' object
const authorSchema = new schema.Entity('authors');
// Data about comment will be store in 'comments' object
const commentSchema = new schema.Entity('comments'); 
// Post object has information about one author and many comments stored in array 
// Author information is stored in 'author' and comments array is 'comments`
const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  comments: [commentSchema]
});


io.on('connection', (socket: any) => {
    let idSock = socket.id
    let addedMail = false;
    console.log('A user connected' + socket.id);
    
    //chat
    socket.on('New chatMsg', async (data: any) => {
        console.log(data);
        //Leer data
        const { mail, msg, time } = data  

        //D23
        const chatMsgNormalizr = normalize(data, postSchema);
        console.log(chatMsgNormalizr);

        //Agregar usuario- asociar correo con socket
        if (!addedMail){
            socket.mail = mail;
        }        

        //Guardar en el archivo txt
        
        const newMsg: IChat = { mail: mail, 
                               time: time, 
                               message: msg  }
        await opsChat.addMessage(newMsg)

        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    });

    //Productos
    socket.on('dataProds', async (data: any) => {
        const { nombre, descripcion, codigo, foto, precio, stock } = data  
        const timestamp = new Date(Date.now());
        const newProduct: IProd = { timestamp, nombre, descripcion, codigo, foto, precio, stock }
        console.log(newProduct)
        await opsProd.addProduct(newProduct)
        io.emit('ProductoAgregado', data);
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});