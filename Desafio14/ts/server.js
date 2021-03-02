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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HistoryMensajesChat = exports.opsChat = exports.opsProd = void 0;
var express = require("express");
var path = require("path");
var ApiProductosRoute_1 = require("./rutas/ApiProductosRoute");
var viewsRoute_1 = require("./rutas/viewsRoute");
var bd_1 = require("./bd/bd");
var archivos_1 = require("./bd/archivos");
var handlebars = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, { autoConnect: false /*, transports: ['websocket']*/ });
exports.opsProd = new bd_1.Producto();
exports.opsChat = new archivos_1.ChatMsg("chatBD.txt");
exports.HistoryMensajesChat = [];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = exports.opsChat;
                return [4 /*yield*/, exports.opsChat.getMessages()];
            case 1:
                _a.ChatMessages = _b.sent();
                return [2 /*return*/];
        }
    });
}); })();
var puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', viewsRoute_1.RouterViewsProductos);
app.use('/api/productos', ApiProductosRoute_1.RouterApiProductos);
//app.use("/scripts", express.static(__dirname + '/public/scripts'));
//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: path.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/public/views/layouts/')
}));
app.set('views', path.resolve(__dirname + '/public/views/'));
app.set('view engine', 'hbs');
//app.set('scripts', express.static(path.resolve(__dirname + '/public/scripts/'))); 
//app.set('socketio', io);
http.listen(puerto, function () {
    console.log('Servidor escuchando en puerto 8080');
}).on("error", function (err) {
    console.log(err);
});
io.on('connection', function (socket) {
    var idSock = socket.id;
    var addedMail = false;
    console.log('A user connected' + socket.id);
    //chat
    socket.on('New chatMsg', function (data) {
        //Leer data
        var mail = data.mail, msg = data.msg, time = data.time;
        //Agregar usuario- asociar correo con socket
        if (!addedMail) {
            socket.mail = mail;
        }
        //Guardar en el archivo txt
        var newMsg = { mail: mail,
            time: time,
            message: msg };
        exports.opsChat.addMessage(newMsg);
        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    });
    //Productos
    socket.on('dataProds', function (data) {
        var title = data.title, price = data.price, thumbnail = data.thumbnail;
        var newProduct = { title: title, price: price, thumbnail: thumbnail };
        exports.opsProd.addProduct(newProduct);
        io.emit('ProductoAgregado', data);
    });
    socket.on('disconnect', function () {
        console.log("Disconnected " + idSock);
    });
});
