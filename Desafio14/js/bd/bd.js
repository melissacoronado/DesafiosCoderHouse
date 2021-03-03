"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor() {
        this.productos = [];
    }
    addProduct(producto) {
        try {
            if (this.productos.length == 0) {
                producto.id = 1;
            }
            else {
                let ultIdProd = this.productos[this.productos.length - 1].id;
                producto.id = ultIdProd + 1;
            }
            this.productos.push(producto);
        }
        catch (error) {
            throw error;
        }
    }
    showProducts() {
        return this.productos;
    }
    updateProducts(idProd, title, price, thumbnail) {
        try {
            const productSelecc = this.productos.find(x => x.id === idProd);
            productSelecc.title = title;
            productSelecc.price = price; // -- !validar null o undefined 
            productSelecc.thumbnail = thumbnail;
        }
        catch (error) {
            throw error;
        }
    }
    deleteProduct(idProd) {
        try {
            this.productos = this.productos.splice(idProd, 1);
            //o psProd.productos = psProd.productos.filter(x => x.id !== id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Producto = Producto;
