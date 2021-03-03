'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Socket = require('dgram');
var express = require('express');
var path = require('path');
var RouterApiProductos = require('./rutas/ApiProductosRoute');
var RouterViewsProductos = require('./rutas/viewsRoute');
var Producto = require('./bd/bd');
var ChatMsg = require('./bd/archivos');

var handlebars = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, { autoConnect: false });

var opsProd = new Producto();
module.exports = opsProd;
var opsChat = new ChatMsg("chatBD.txt");
module.exports = opsChat;
var HistoryMensajesChat = [];
module.exports = HistoryMensajesChat(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return opsChat.getMessages();

                case 2:
                    opsChat.ChatMessages = _context.sent;

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})))();

var puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos);

//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: path.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: path.resolve(__dirname + '/public/views/layouts/')
}));
app.set('views', path.resolve(__dirname + '/public/views/'));
app.set('view engine', 'hbs');

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
        var mail = data.mail,
            msg = data.msg,
            time = data.time;

        //Agregar usuario- asociar correo con socket

        if (!addedMail) {
            socket.mail = mail;
        }

        //Guardar en el archivo txt

        var newMsg = { mail: mail,
            time: time,
            message: msg };
        opsChat.addMessage(newMsg);

        //Emit para mostrar en la lista
        io.emit('new message', newMsg);
    });

    //Productos
    socket.on('dataProds', function (data) {
        var title = data.title,
            price = data.price,
            thumbnail = data.thumbnail;

        var newProduct = { title: title, price: price, thumbnail: thumbnail };
        opsProd.addProduct(newProduct);
        io.emit('ProductoAgregado', data);
    });

    socket.on('disconnect', function () {
        console.log('Disconnected ' + idSock);
    });
});
