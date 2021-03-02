'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HistoryMensajesChat = exports.opsChat = exports.opsProd = undefined;

var _dgram = require('dgram');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ApiProductosRoute = require('./rutas/ApiProductosRoute');

var _viewsRoute = require('./rutas/viewsRoute');

var _bd = require('./bd/bd');

var _archivos = require('./bd/archivos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var handlebars = require('express-handlebars');
var app = (0, _express2.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http, { autoConnect: false });

var opsProd = exports.opsProd = new _bd.Producto();
var opsChat = exports.opsChat = new _archivos.ChatMsg("chatBD.txt");
var HistoryMensajesChat = exports.HistoryMensajesChat = [];
_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
}))();

var puerto = process.env.port || 8080;
app.use('/api', _express2.default.static(__dirname + '/public')); //Al principio
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use('/api', _viewsRoute.RouterViewsProductos);
app.use('/api/productos', _ApiProductosRoute.RouterApiProductos);

//Sets handlebars configurations 
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    partialsDir: _path2.default.resolve(__dirname + '/public/views/partials/'),
    layoutsDir: _path2.default.resolve(__dirname + '/public/views/layouts/')
}));
app.set('views', _path2.default.resolve(__dirname + '/public/views/'));
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
