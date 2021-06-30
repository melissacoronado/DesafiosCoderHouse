"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opcDao = exports.passport = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const productosRoute_1 = require("./routes/productosRoute");
const viewsRoute_1 = require("./routes/viewsRoute");
const authRoute_1 = require("./routes/authRoute");
const mensajes_1 = require("./service/mensajes");
const db = require('./service/bd'); //Para conex a la bd moongose
const session = require('express-session');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MongoStore = require('connect-mongo');
const compression = require('compression');
const logger_1 = require("./helper/logger");
exports.passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users_1 = require("./service/users");
const dotenv = require('dotenv');
dotenv.config();
let puerto = process.env.port || 3000;
const handlebars = require('express-handlebars');
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http, { autoConnect: false /*, transports: ['websocket']*/ });
const optionsMongoAtlas = { useNewUrlParser: true, useUnifiedTopology: true };
//dependiendo opcion ingresada hacer new?
exports.opcDao = process.argv;
console.log(exports.opcDao);
let opsChat = new mensajes_1.ChatMsg();
app.use('/api', express_1.default.static(__dirname + '/..' + '/public')); //Al principio
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(compression());
//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: path_1.default.resolve(__dirname + '/..' + '/public/views/partials/'),
    layoutsDir: path_1.default.resolve(__dirname + '/..' + '/public/views/layouts/'),
}));
app.set('views', path_1.default.resolve(__dirname + '/..' + '/public/views/'));
app.set('view engine', 'hbs');
app.enable("trust proxy");
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
let UsuarioDB = new users_1.Usuario();
exports.passport.use(new LocalStrategy(function (username, email, done) {
    console.log('LocalStrategy');
    let usuario = UsuarioDB.getUser(username, email);
    console.log(usuario);
    if (!usuario) {
        return done(null, false);
    }
    return done(null, usuario);
}));
app.use(exports.passport.initialize());
app.use(exports.passport.session());
app.use('/api', viewsRoute_1.RouterViewsProductos);
app.use('/api/productos', productosRoute_1.RouterProductos);
app.use("/", authRoute_1.AuthUsers);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));
//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);
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
/*module.exports = {
    log4js: logger
  };*/
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
