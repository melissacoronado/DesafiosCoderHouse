"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Restanado = /** @class */ (function () {
    function Restanado(n1, n2) {
        this.num1 = n1;
        this.num2 = n2;
    }
    Restanado.prototype.resultado = function () {
        return this.num1 - this.num2;
    };
    return Restanado;
}());
exports.default = Restanado;
