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
const productos_1 = require("../service/productos");
const assert = require('assert').strict;
let opsProd = new productos_1.Producto();
describe("test de integración de Productos", function () {
    it('debería mostrar listado de productos existentes', () => __awaiter(this, void 0, void 0, function* () {
        let listado = yield opsProd.showProducts();
        assert.notEqual(listado.length, 0);
    }));
});
