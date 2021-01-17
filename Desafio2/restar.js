"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restar = void 0;
var Restar = /** @class */ (function () {
    function Restar(n1, n2) {
        this.num1 = n1;
        this.num2 = n2;
    }
    Restar.prototype.resultado = function () {
        return this.num1 - this.num2;
    };
    return Restar;
}());
exports.Restar = Restar;
