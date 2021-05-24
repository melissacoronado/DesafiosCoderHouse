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
exports.Producto = void 0;
const productos_1 = require("../models/productos");
class Producto {
    constructor() {
        this.productos = [];
        this.addProduct = (producto) => __awaiter(this, void 0, void 0, function* () {
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
        this.showProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_1.productosModel.find({})
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
                return this.productos;
            }
            catch (error) {
                throw error;
            }
        });
        this.updateProducts = (idProd, nombre, descripcion, codigo, foto, precio, stock) => __awaiter(this, void 0, void 0, function* () {
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
        this.deleteProduct = (idProd) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_1.productosModel.deleteOne({ _id: idProd });
                console.log("Producto Eliminado");
            }
            catch (error) {
                throw error;
            }
        });
        /*generateProducts = (cant: number) => {
            let productosMock = [];
            for(let i=0; i<cant; i++){
                let productomock = getProds();
                productosMock.push(productomock);
            }
            return  productosMock;
        }*/
    }
}
exports.Producto = Producto;
