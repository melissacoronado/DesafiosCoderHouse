import { Socket } from 'dgram';
import express, {Application, Request, Response} from 'express'
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
var cluster = require('cluster');


const handlebars = require('express-handlebars');
const app:Application = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })

const optionsMongoAtlas = {useNewUrlParser: true, useUnifiedTopology: true}

let opsProd = new Producto()
let opsChat = new ChatMsg();

let puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(compression())

//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir: path.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/public/views/layouts/'),
}));
app.set('views', path.resolve(__dirname + '/public/views/')); 
app.set('view engine', 'hbs');


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
}))

app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos);
app.use("/", AuthUsers);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));
//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);

var ddbDynamo;
var ddbTableDynamo;
var snsAws;
var snsTopicAws;

//console.log(cluster.isMaster);
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker: any) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
// Code to run if we're in a worker process
} else {
    var AWS = require('aws-sdk');
    AWS.config.region = process.env.REGION

    var snsAws = new AWS.SNS();
    ddbDynamo = new AWS.DynamoDB();
    //console.log(`sns ${sns}`);

    ddbTableDynamo =  process.env.STARTUP_SIGNUP_TABLE;
    //console.log(ddbTable);
    snsTopicAws =  process.env.NEW_SIGNUP_TOPIC;

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
}
export const ddb = ddbDynamo;
export const ddbTable = ddbTableDynamo;
export const sns = snsAws;
export const snsTopic = snsTopicAws;

/*
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
});*/