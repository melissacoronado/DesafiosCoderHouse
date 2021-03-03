"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express'); //const opsProd = require('../server')
//const opsChat = require('../server')


var Producto = require('../bd/bd');

var ChatMsg = require('../bd/archivos');

var opsProd = new Producto();
var opsChat = new ChatMsg("chatBD.txt");

_asyncToGenerator(function* () {
  opsChat.ChatMessagess = yield opsChat.getMessages();
})();

var router = express.Router();
router.get('/productos/vista', (req, res) => {
  try {
    //console.log(HistoryMensajesChat)
    res.render('partials/main', {
      layout: 'index',
      ListaProductos: opsProd.productos,
      ListaMsjChat: opsChat.ChatMessagess
    });
  } catch (error) {
    res.status(404).json({
      error: 'Error mostrando listado de Productos.'
    });
    console.log(error);
  }
});
router.post('/productos', (req, res) => {
  try {
    console.log('post productos');
    var {
      title,
      price,
      thumbnail
    } = req.body; //Falta validar que vengan todos los parametros              

    var newProduct = {
      title,
      price,
      thumbnail
    };
    opsProd.addProduct(newProduct); //res.render('partials/addProducts', {layout : 'index'});

    res.render('partials/main', {
      layout: 'index',
      ListaProductos: opsProd.productos
    });
  } catch (error) {
    res.status(404).json({
      error: 'No se pudo agregar el Producto.'
    });
    console.log(error);
  }
});
var RouterViewsProductos = router;
module.exports = RouterViewsProductos;