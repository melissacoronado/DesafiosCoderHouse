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
exports.HistoryMensajesChat = exports.opsChat = exports.opsProd = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ApiProductosRoute_1 = require("./rutas/ApiProductosRoute");
const viewsRoute_1 = require("./rutas/viewsRoute");
const bd_1 = require("./bd/bd");
const archivos_1 = require("./bd/archivos");
const handlebars = require('express-handlebars');
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http, { autoConnect: false /*, transports: ['websocket']*/ });
exports.opsProd = new bd_1.Producto();
exports.opsChat = new archivos_1.ChatMsg("chatBD.txt");
exports.HistoryMensajesChat = [];
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.opsChat.ChatMessages = yield exports.opsChat.getMessages();
}))();
let puerto = process.env.port || 8080;
app.use('/api', express_1.default.static(__dirname + '/public')); //Al principio
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', viewsRoute_1.RouterViewsProductos);
app.use('/api/productos', ApiProductosRoute_1.RouterApiProductos);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));
//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: path_1.default.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path_1.default.resolve(__dirname + '/public/views/layouts/'),
}));
app.set('views', path_1.default.resolve(__dirname + '/public/views/'));
app.set('view engine', 'hbs');
//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);
http.listen(puerto, () => {
    console.log('Servidor escuchando en puerto 8080');
}).on("error", (err) => {
    console.log(err);
});
io.on('connection', (socket) => {
    let idSock = socket.id;
    let addedMail = false;
    console.log('A user connected' + socket.id);
    //chat
    socket.on('New chatMsg', (data) => {
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
        exports.opsChat.addMessage(newMsg);
        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    });
    //Productos
    socket.on('dataProds', (data) => {
        const { title, price, thumbnail } = data;
        const newProduct = { title, price, thumbnail };
        exports.opsProd.addProduct(newProduct);
        io.emit('ProductoAgregado', data);
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});
