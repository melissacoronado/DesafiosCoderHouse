"use strict";
exports.__esModule = true;
exports.RouterViewsProductos = void 0;
var express = require("express");
var server_1 = require("../server");
var router = express.Router();
router.get('/productos/vista', function (req, res) {
    try {
        //console.log(HistoryMensajesChat)
        res.render('partials/main', { layout: 'index', ListaProductos: server_1.opsProd.productos, ListaMsjChat: server_1.opsChat.ChatMessages });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando listado de Productos.' });
        console.log(error);
    }
});
router.post('/productos', function (req, res) {
    try {
        console.log('post productos');
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        //Falta validar que vengan todos los parametros              
        var newProduct = { title: title, price: price, thumbnail: thumbnail };
        server_1.opsProd.addProduct(newProduct);
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', { layout: 'index', ListaProductos: server_1.opsProd.productos });
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo agregar el Producto.' });
        console.log(error);
    }
});
exports.RouterViewsProductos = router;
