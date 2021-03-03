"use strict";
exports.__esModule = true;
exports.Producto = void 0;
var Producto = /** @class */ (function () {
    function Producto() {
        this.productos = [];
    }
    Producto.prototype.addProduct = function (producto) {
        try {
            if (this.productos.length == 0) {
                producto.id = 1;
            }
            else {
                var ultIdProd = this.productos[this.productos.length - 1].id;
                producto.id = ultIdProd + 1;
            }
            this.productos.push(producto);
        }
        catch (error) {
            throw error;
        }
    };
    Producto.prototype.showProducts = function () {
        return this.productos;
    };
    Producto.prototype.updateProducts = function (idProd, title, price, thumbnail) {
        try {
            var productSelecc = this.productos.find(function (x) { return x.id === idProd; });
            productSelecc.title = title;
            productSelecc.price = price; // -- !validar null o undefined 
            productSelecc.thumbnail = thumbnail;
        }
        catch (error) {
            throw error;
        }
    };
    Producto.prototype.deleteProduct = function (idProd) {
        try {
            this.productos = this.productos.splice(idProd, 1);
            //o psProd.productos = psProd.productos.filter(x => x.id !== id);
        }
        catch (error) {
            throw error;
        }
    };
    return Producto;
}());
exports.Producto = Producto;
