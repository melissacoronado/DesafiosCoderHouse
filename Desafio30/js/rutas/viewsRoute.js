"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterViewsProductos = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
var router = express_1.default.Router();
router.get('/productos/vista', (req, res) => {
    try {
        //console.log(HistoryMensajesChat)
        res.render('partials/main', { layout: 'index', ListaProductos: server_1.opsProd.productos, ListaMsjChat: server_1.opsChat.ChatMessages });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando listado de Productos.' });
        console.log(error);
    }
});
router.post('/productos', (req, res) => {
    try {
        console.log('post productos');
        const { title, price, thumbnail } = req.body;
        //Falta validar que vengan todos los parametros              
        const newProduct = { title, price, thumbnail };
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
