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
Object.defineProperty(exports, "__esModule", { value: true });
const productos_DAO_1 = require("./productos.DAO");
const productos_1 = require("../models/productos");
class ProductosDbDao extends productos_DAO_1.Producto {
    constructor() {
        super(...arguments);
        this.productos = [];
    }
    showProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productos_1.productosModel.find({})
                    .then((productos) => {
                    if (productos.length > 0) {
                        this.productos = productos.map((val) => ({
                            id: val.id,
                            timestamp: val.created_at,
                            nombre: val.nombre,
                            descripcion: val.descripcion,
                            codigo: val.codigo,
                            foto: val.foto,
                            precio: val.precio,
                            stock: val.stock
                        }));
                    }
                })
                    .catch((error) => console.log(error));
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProduct(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Msg = new productos_1.productosModel(producto);
                yield Msg.save()
                    .then(() => console.log("Producto Guardado"))
                    .catch((err) => console.log(err));
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
                return yield productos_1.productosModel.findOne({ _id: idProd }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProducts(idProd, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_1.productosModel.updateOne({ _id: idProd }, { $set: {
                        timestamp: new Date(Date.now()),
                        nombre: nombre,
                        descripcion: descripcion,
                        codigo: codigo,
                        foto: foto,
                        precio: precio,
                        stock: stock
                    }
                })
                    .then(() => console.log("Producto Actualizado"))
                    .catch((err) => console.log(err));
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProduct(idProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_1.productosModel.deleteOne({ _id: idProd });
                console.log("Producto Eliminado");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductosDbDao;
