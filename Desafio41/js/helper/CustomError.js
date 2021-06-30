"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError {
    constructor(estado, descripcion, detalles) {
        this.estado = estado;
        this.descripcion = descripcion;
        this.detalles = detalles;
    }
}
exports.default = CustomError;
