"use strict";

var express = require('express');

var opsProd = require('../server');

var opsChat = require('../server');

var router = express.Router();
router.get('/productos/vista', (req, res) => {
  try {
    //console.log(HistoryMensajesChat)
    res.render('partials/main', {
      layout: 'index',
      ListaProductos: opsProd.productos,
      ListaMsjChat: opsChat.ChatMessages
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