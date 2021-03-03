"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var json = require('express');

var Producto = /*#__PURE__*/function () {
  function Producto() {
    _classCallCheck(this, Producto);

    this.productos = [];
  }

  _createClass(Producto, [{
    key: "addProduct",
    value: function addProduct(producto) {
      try {
        if (this.productos.length == 0) {
          producto.id = 1;
        } else {
          var ultIdProd = this.productos[this.productos.length - 1].id;
          producto.id = ultIdProd + 1;
        }

        this.productos.push(producto);
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "showProducts",
    value: function showProducts() {
      return this.productos;
    }
  }, {
    key: "updateProducts",
    value: function updateProducts(idProd, title, price, thumbnail) {
      try {
        var productSelecc = this.productos.find(function (x) {
          return x.id === idProd;
        });
        productSelecc.title = title;
        productSelecc.price = price; // -- !validar null o undefined 

        productSelecc.thumbnail = thumbnail;
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(idProd) {
      try {
        this.productos = this.productos.splice(idProd, 1); //o psProd.productos = psProd.productos.filter(x => x.id !== id);
      } catch (error) {
        throw error;
      }
    }
  }]);

  return Producto;
}();

module.exports = Producto;