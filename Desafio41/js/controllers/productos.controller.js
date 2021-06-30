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
exports.deleteProductos = exports.patchProductos = exports.postProductos = exports.getProductosById = exports.getProductos = void 0;
const logger_1 = require("../helper/logger");
const server_1 = require("../server");
const productos_BD_DAO_1 = __importDefault(require("../DAO/productos.BD.DAO"));
const productos_File_DAO_1 = __importDefault(require("../DAO/productos.File.DAO"));
const productos_DAO_1 = require("../DAO/productos.DAO");
let opsProd = new productos_DAO_1.Producto();
if (server_1.opcDao[2] == "two") {
    let opsProd = new productos_BD_DAO_1.default();
}
else {
    let opsProd = new productos_File_DAO_1.default();
}
//let opsProd = new Producto();
const getProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield opsProd.showProducts();
        if (products == null) {
            logger_1.loggerWarn.warn("No hay productos cargados.");
            res.status(404).json({ error: 'No hay productos cargados.' });
            next();
        }
        else {
            logger_1.logger.info("Obtener productos Ok");
            res.status(200).send(products);
            next();
        }
    }
    catch (error) {
        logger_1.loggerError.error(error.message);
        res.sendStatus(500) && next(error);
    }
});
exports.getProductos = getProductos;
const getProductosById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield opsProd.showProductById(id);
        //if (product.length == 0){
        if (product == null) {
            logger_1.loggerWarn.warn("No se encontro producto buscado.");
            res.status(404).json({ error: 'No se encontro producto buscado.' });
            next();
        }
        else {
            logger_1.logger.info(`Obtener producto ${id} Ok`);
            res.status(200).send(product);
            next();
        }
    }
    catch (error) {
        logger_1.loggerError.error(error.message);
        res.sendStatus(404).json({ error: 'No se encontro producto buscado.' }) && next(error);
    }
});
exports.getProductosById = getProductosById;
const postProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock };
        yield opsProd.addProduct(newProduct);
        logger_1.logger.info('Producto almacenado con exito');
        res.status(200).json('Producto almacenado con exito');
    }
    catch (error) {
        logger_1.loggerError.error(error.message);
        res.status(404).json({ error: 'No se pudo agregar el Producto.' }) && next(error);
        //res.sendStatus(500) && next(error)
    }
});
exports.postProductos = postProductos;
const patchProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productUpdate = yield opsProd.showProductById(id);
        if (productUpdate === null) {
            logger_1.loggerError.error(`Producto no encontrado ${id}`);
            res.status(404).json({ error: 'Producto no encontrado' });
            next();
        }
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        yield opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock);
        logger_1.logger.info('Producto Modificado!');
        res.status(200).json({ Respuesta: "Producto Modificado!" });
        next();
    }
    catch (error) {
        logger_1.loggerError.error(error.message);
        res.status(404).json({ error: 'Producto no encontrado.' }) && next(error);
        //res.sendStatus(500) && next(error)
    }
});
exports.patchProductos = patchProductos;
const deleteProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productDelete = yield opsProd.showProductById(id);
        if (productDelete === null) {
            logger_1.loggerError.error(`Producto no encontrado ${id}`);
            res.status(404).json({ error: 'Producto no encontrado' });
            next();
        }
        yield opsProd.deleteProduct(id);
        logger_1.logger.info('Producto Eliminado!');
        res.status(200).send('Producto Eliminado.');
    }
    catch (error) {
        logger_1.loggerError.error(error.message);
        res.status(404).json({ error: 'Producto no encontrado.' }) && next(error);
        //res.sendStatus(500) && next(error)
    }
});
exports.deleteProductos = deleteProductos;
