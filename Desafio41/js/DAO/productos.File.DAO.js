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
const productos_DAO_1 = require("./productos.DAO");
const fs = require('fs');
const path = require('path');
const productos_1 = __importDefault(require("../DTO/productos"));
class ProductosFileDao extends productos_DAO_1.Producto {
    constructor() {
        super(...arguments);
        this.productos = [];
    }
    showProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let retorno = [];
                const data = yield fs.promises.readFile(path.resolve(__dirname, "productos.txt"), { encoding: 'utf8' });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProduct(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let archivo = yield this.showProducts();
                let File = JSON.parse(archivo);
                producto.id = File.length + 1;
                File.push(producto);
                const data = yield fs.promises.writeFile(path.resolve(__dirname, "productos.txt"), JSON.stringify(File));
                console.log("Archivo Guardado");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    showProductById(idProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let archivo = yield this.showProducts();
                let producto = archivo.map((i) => JSON.parse(i)).find((c) => c._id === idProd);
                return producto;
                //Falta filtrar
            }
            catch (error) {
                throw error;
            }
        });
    }
    showProductDto(idProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let producto = this.showProductById(idProd);
                return productos_1.default.productoConInfo(producto);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProducts(idProd, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Falta implementar 
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProduct(idProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Falta implementar 
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductosFileDao;
