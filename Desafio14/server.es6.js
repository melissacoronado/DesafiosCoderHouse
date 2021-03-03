const Socket = require('dgram')
const express = require('express')
const path = require('path')
const RouterApiProductos = require('./rutas/ApiProductosRoute')
const RouterViewsProductos = require('./rutas/viewsRoute')
const IProd, Producto = require('./bd/bd')
const IChat, ChatMsg = require('./bd/archivos')

const handlebars = require('express-handlebars');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false })


export let opsProd = new Producto()
export let opsChat = new ChatMsg("chatBD.txt")
export let HistoryMensajesChat = [];
(async () => { 
    opsChat.ChatMessages = await opsChat.getMessages()            
})()

let puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos);




//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir: path.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/public/views/layouts/'),
}));
app.set('views', path.resolve(__dirname + '/public/views/')); 
app.set('view engine', 'hbs');


http.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
     
}).on("error", (err)=>{
    console.log(err)
})



io.on('connection', (socket) => {
    let idSock = socket.id
    let addedMail = false;
    console.log('A user connected' + socket.id);

    
    //chat
    socket.on('New chatMsg', (data) => {
        //Leer data
        const { mail, msg, time } = data  

        //Agregar usuario- asociar correo con socket
        if (!addedMail){
            socket.mail = mail;
        }        

        //Guardar en el archivo txt
        
        const newMsg = { mail: mail, 
                               time: time, 
                               message: msg  }
        opsChat.addMessage(newMsg)

        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    });

    //Productos
    socket.on('dataProds', (data) => {
        const { title, price, thumbnail } = data  
        const newProduct = { title, price, thumbnail }
        opsProd.addProduct(newProduct)
        io.emit('ProductoAgregado', data);
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});