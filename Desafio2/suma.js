"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sumar = /** @class */ (function () {
    function Sumar(n1, n2) {
        this.num1 = n1;
        this.num2 = n2;
    }
    Sumar.prototype.resultado = function () {
        return this.num1 + this.num2;
    };
    return Sumar;
}());
exports.default = Sumar;
