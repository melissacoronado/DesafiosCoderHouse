import { Socket } from 'dgram';
import express, {Application, Request, Response} from 'express'
var { graphqlHTTP }  = require('express-graphql');
var { buildSchema } = require('graphql');

import path from 'path'
import { RouterApiProductos } from './routes/ApiProductosRoute';
import { RouterViewsProductos } from './routes/viewsRoute';
import { AuthUsers } from './routes/authRoute';
import { IProd, Producto } from './service/productos';
import { IChat, ChatMsg } from './service/mensajes';
const db = require('./service/bd') //Para conex a la bd moongose
const session = require('express-session');
import cookieParser from 'cookie-parser';
const MongoStore = require('connect-mongo');
const compression = require('compression');
import { logger } from './helper/logger';
export const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { Usuario } from './service/users'

import { schema, root } from './helper/grapql'

const handlebars = require('express-handlebars');
const app:Application = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })

const optionsMongoAtlas = {useNewUrlParser: true, useUnifiedTopology: true}

let opsProd = new Producto()
let opsChat = new ChatMsg();

let puerto = process.env.port || 8080;


app.use('/api', express.static(__dirname + '/..'+ '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(compression())

//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir: path.resolve(__dirname + '/..'+ '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/..'+ '/public/views/layouts/'),
}));
app.set('views', path.resolve(__dirname + '/..'+ '/public/views/')); 
app.set('view engine', 'hbs');

app.enable("trust proxy");

app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongoOptions: optionsMongoAtlas
    }),
    secret:'123456789',
    resave: false,
    saveUninitialized: true,    
    cookie: {
        maxAge: (60 * 100000) //10 minuto
      }
}));


let UsuarioDB = new Usuario();
passport.use(new LocalStrategy(
    function(username: string, email: string, done: any) {
        console.log('LocalStrategy');
        let usuario = UsuarioDB.getUser(username, email);
     console.log(usuario);
        if (!usuario) { 
            return done(null, false); 
        }
        return done(null, usuario);      
    }
  ));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos);
app.use("/", AuthUsers);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));
//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

http.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
    logger.trace("Servidor escuchando en puerto 8080");
    logger.debug("Servidor escuchando en puerto 8080");
    logger.info("Servidor escuchando en puerto 8080");
    logger.warn("Servidor escuchando en puerto 8080");
}).on("error", (err: any)=>{
    console.log(err)
    logger.error(err);
    logger.fatal(err);
})


/*module.exports = {
    log4js: logger
  };*/


io.on('connection', (socket: any) => {
    let idSock = socket.id
    let addedMail = false;
    console.log('A user connected' + socket.id);
    
    //chat
    socket.on('New chatMsg', async (data: any) => {
        //console.log(data);
        //Leer data
        const { mail, msg, time } = data  

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