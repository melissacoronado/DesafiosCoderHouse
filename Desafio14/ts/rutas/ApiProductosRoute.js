"use strict";
exports.__esModule = true;
exports.RouterApiProductos = void 0;
var express = require("express");
var server_1 = require("../server");
var router = express.Router();
router.get('/', function (req, res) {
    try {
        var products = server_1.opsProd.showProducts();
        if (products.length == 0) {
            res.status(404).json({ error: 'No hay productos cargados.' });
        }
        else {
            res.status(200).send(products);
        }
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo obtener el listado de Productos.' });
    }
});
router.get('/:id', function (req, res) {
    try {
        var id_1 = +req.params.id; //Viene de la url/1 y el + para parsear a numero
        var product = server_1.opsProd.productos.find(function (x) { return x.id === id_1; });
        if (server_1.opsProd.productos.length == 0)
            res.status(404).json({ error: 'No hay productos cargados' });
        if (product === null)
            res.status(404).json({ error: 'Producto no encontrado' });
        res.status(200).send(product);
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo obtener el Producto solicitado.' });
    }
});
router.patch('/actualizar/:id', function (req, res) {
    try {
        var id_2 = +req.params.id; //Viene de la url/1 y el + para parsear a numero
        if (server_1.opsProd.productos.length == 0)
            res.status(404).json({ error: 'No hay productos cargados' });
        var productSelecc = server_1.opsProd.productos.find(function (x) { return x.id === id_2; });
        if (productSelecc === null)
            res.status(404).json({ error: 'Producto no encontrado' });
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        server_1.opsProd.updateProducts(id_2, title, price, thumbnail);
        res.status(200).json({ Respuesta: "Producto Modificado!" });
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo modificar el Producto.' });
    }
});
router["delete"]('/borrar/:id', function (req, res) {
    try {
        var id_3 = +req.params.id;
        if (server_1.opsProd.productos.length == 0)
            res.status(404).json({ error: 'No hay productos cargados' });
        var product = server_1.opsProd.productos.find(function (x) { return x.id === id_3; });
        if (product === null)
            res.status(404).json({ error: 'Producto no encontrado' });
        server_1.opsProd.deleteProduct(id_3);
        res.status(200).send('Producto Eliminado.');
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo eliminar el Producto.' });
    }
});
exports.RouterApiProductos = router;
