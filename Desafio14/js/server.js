"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var io = require('socket.io')(http, {
  autoConnect: false
});

var opsProd = new Producto();
module.exports = opsProd;
var opsChat = new ChatMsg("chatBD.txt");
module.exports = opsChat;
var HistoryMensajesChat = [];
module.exports = HistoryMensajesChat;

_asyncToGenerator(function* () {
  opsChat.ChatMessages = yield opsChat.getMessages();
})();

var puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api', RouterViewsProductos);
app.use('/api/productos', RouterApiProductos); //Sets handlebars configurations 

app.engine('hbs', handlebars({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  partialsDir: path.resolve(__dirname + '/public/views/partials/'),
  layoutsDir: path.resolve(__dirname + '/public/views/layouts/')
}));
app.set('views', path.resolve(__dirname + '/public/views/'));
app.set('view engine', 'hbs');
http.listen(puerto, () => {
  console.log('Servidor escuchando en puerto 8080');
}).on("error", err => {
  console.log(err);
});
io.on('connection', socket => {
  var idSock = socket.id;
  var addedMail = false;
  console.log('A user connected' + socket.id); //chat

  socket.on('New chatMsg', data => {
    //Leer data
    var {
      mail,
      msg,
      time
    } = data; //Agregar usuario- asociar correo con socket

    if (!addedMail) {
      socket.mail = mail;
    } //Guardar en el archivo txt


    var newMsg = {
      mail: mail,
      time: time,
      message: msg
    };
    opsChat.addMessage(newMsg); //Emit para mostrar en la lista

    io.emit('new message', newMsg);
  }); //Productos

  socket.on('dataProds', data => {
    var {
      title,
      price,
      thumbnail
    } = data;
    var newProduct = {
      title,
      price,
      thumbnail
    };
    opsProd.addProduct(newProduct);
    io.emit('ProductoAgregado', data);
  });
  socket.on('disconnect', () => {
    console.log("Disconnected ".concat(idSock));
  });
});
