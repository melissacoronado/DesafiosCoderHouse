"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterApiProductos = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
var router = express_1.default.Router();
router.get('/', (req, res) => {
    try {
        const products = server_1.opsProd.showProducts();
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
router.get('/:id', (req, res) => {
    try {
        const id = +req.params.id; //Viene de la url/1 y el + para parsear a numero
        const product = server_1.opsProd.productos.find(x => x.id === id);
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
router.patch('/actualizar/:id', (req, res) => {
    try {
        const id = +req.params.id; //Viene de la url/1 y el + para parsear a numero
        if (server_1.opsProd.productos.length == 0)
            res.status(404).json({ error: 'No hay productos cargados' });
        const productSelecc = server_1.opsProd.productos.find(x => x.id === id);
        if (productSelecc === null)
            res.status(404).json({ error: 'Producto no encontrado' });
        const { title, price, thumbnail } = req.body;
        server_1.opsProd.updateProducts(id, title, price, thumbnail);
        res.status(200).json({ Respuesta: "Producto Modificado!" });
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo modificar el Producto.' });
    }
});
router.delete('/borrar/:id', (req, res) => {
    try {
        const id = +req.params.id;
        if (server_1.opsProd.productos.length == 0)
            res.status(404).json({ error: 'No hay productos cargados' });
        const product = server_1.opsProd.productos.find(x => x.id === id);
        if (product === null)
            res.status(404).json({ error: 'Producto no encontrado' });
        server_1.opsProd.deleteProduct(id);
        res.status(200).send('Producto Eliminado.');
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo eliminar el Producto.' });
    }
});
exports.RouterApiProductos = router;
