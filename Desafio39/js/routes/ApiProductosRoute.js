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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterApiProductos = void 0;
const express_1 = __importDefault(require("express"));
const productos_1 = require("../service/productos");
const logger_1 = require("../helper/logger");
//import { exception } from 'node:console';
let opsProd = new productos_1.Producto();
var router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield opsProd.showProducts();
        //throw 'Test error log4js!'; //Para probar el log
        if (products.length == 0) {
            logger_1.loggerWarn.warn("No hay productos cargados.");
            res.status(404).json({ error: 'No hay productos cargados.' });
            return;
        }
        else {
            logger_1.logger.info("Obtener productos Ok");
            res.status(200).send(products);
            return;
        }
    }
    catch (error) {
        logger_1.loggerError.error(error);
        res.status(404).json({ error: 'No se pudo obtener el listado de Productos.' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id; //Viene de la url/1 y el + para parsear a numero
        opsProd.productos = yield opsProd.showProducts();
        const product = opsProd.productos.find(x => x.id === id);
        if (opsProd.productos.length == 0) {
            res.status(404).json({ error: 'No hay productos cargados' });
            return;
        }
        if (product === null) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo obtener el Producto solicitado.' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('post productos');
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
        //Falta validar que vengan todos los parametros              
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock };
        yield opsProd.addProduct(newProduct);
        //res.render('partials/addProducts', {layout : 'index'});
        //res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
        res.status(200).json('Producto almacenado con exito');
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo agregar el Producto.' });
        console.log(error);
    }
}));
router.patch('/actualizar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //Viene de la url/1 y el + para parsear a numero
        opsProd.productos = yield opsProd.showProducts();
        if (opsProd.productos.length == 0) {
            res.status(404).json({ error: 'No hay productos cargados' });
            return;
        }
        const productSelecc = opsProd.productos.find(x => x.id === id);
        if (productSelecc === null) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        yield opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock);
        res.status(200).json({ Respuesta: "Producto Modificado!" });
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo modificar el Producto.' });
        console.error(error);
    }
}));
router.delete('/borrar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        opsProd.productos = yield opsProd.showProducts();
        if (opsProd.productos.length == 0) {
            res.status(404).json({ error: 'No hay productos cargados' });
            return;
        }
        const product = opsProd.productos.find(x => x.id === id);
        if (product === null) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        yield opsProd.deleteProduct(id);
        res.status(200).send('Producto Eliminado.');
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo eliminar el Producto.' });
    }
}));
exports.RouterApiProductos = router;
