"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snsTopic = exports.sns = exports.ddbTable = exports.ddb = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ApiProductosRoute_1 = require("./routes/ApiProductosRoute");
const viewsRoute_1 = require("./routes/viewsRoute");
const authRoute_1 = require("./routes/authRoute");
const productos_1 = require("./service/productos");
const mensajes_1 = require("./service/mensajes");
const db = require('./service/bd'); //Para conex a la bd moongose
const session = require('express-session');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MongoStore = require('connect-mongo');
const compression = require('compression');
const logger_1 = require("./helper/logger");
var cluster = require('cluster');
const handlebars = require('express-handlebars');
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http, { autoConnect: false /*, transports: ['websocket']*/ });
const optionsMongoAtlas = { useNewUrlParser: true, useUnifiedTopology: true };
let opsProd = new productos_1.Producto();
let opsChat = new mensajes_1.ChatMsg();
let puerto = process.env.port || 8080;
app.use('/api', express_1.default.static(__dirname + '/public')); //Al principio
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(compression());
//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: path_1.default.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path_1.default.resolve(__dirname + '/public/views/layouts/'),
}));
app.set('views', path_1.default.resolve(__dirname + '/public/views/'));
app.set('view engine', 'hbs');
app.use(cookie_parser_1.default());
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongoOptions: optionsMongoAtlas
    }),
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: (60 * 100000) //10 minuto
    }
}));
app.use('/api', viewsRoute_1.RouterViewsProductos);
app.use('/api/productos', ApiProductosRoute_1.RouterApiProductos);
app.use("/api/user", authRoute_1.AuthUsers);
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
    cluster.on('exit', function (worker) {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
    // Code to run if we're in a worker process
}
else {
    var AWS = require('aws-sdk');
    AWS.config.region = process.env.REGION;
    var snsAws = new AWS.SNS();
    ddbDynamo = new AWS.DynamoDB();
    //console.log(`sns ${sns}`);
    ddbTableDynamo = process.env.STARTUP_SIGNUP_TABLE;
    //console.log(ddbTable);
    snsTopicAws = process.env.NEW_SIGNUP_TOPIC;
    http.listen(puerto, () => {
        console.log('Servidor escuchando en puerto 8080');
        logger_1.logger.trace("Servidor escuchando en puerto 8080");
        logger_1.logger.debug("Servidor escuchando en puerto 8080");
        logger_1.logger.info("Servidor escuchando en puerto 8080");
        logger_1.logger.warn("Servidor escuchando en puerto 8080");
    }).on("error", (err) => {
        console.log(err);
        logger_1.logger.error(err);
        logger_1.logger.fatal(err);
    });
}
exports.ddb = ddbDynamo;
exports.ddbTable = ddbTableDynamo;
exports.sns = snsAws;
exports.snsTopic = snsTopicAws;
io.on('connection', (socket) => {
    let idSock = socket.id;
    let addedMail = false;
    console.log('A user connected' + socket.id);
    //chat
    socket.on('New chatMsg', (data) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(data);
        //Leer data
        const { mail, msg, time } = data;
        //Agregar usuario- asociar correo con socket
        if (!addedMail) {
            socket.mail = mail;
        }
        //Guardar en el archivo txt
        const newMsg = { mail: mail,
            time: time,
            message: msg };
        yield opsChat.addMessage(newMsg);
        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    }));
    //Productos
    socket.on('dataProds', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { nombre, descripcion, codigo, foto, precio, stock } = data;
        const timestamp = new Date(Date.now());
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock };
        console.log(newProduct);
        yield opsProd.addProduct(newProduct);
        io.emit('ProductoAgregado', data);
    }));
    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});
