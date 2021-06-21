"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productosCollection = 'productos';
const productosSchema = new mongoose_1.default.Schema({
    //id: {type: Number },
    timestamp: { type: Date, require: true },
    nombre: { type: String, require: true, max: 30 },
    descripcion: { type: String, require: true, max: 100 },
    codigo: { type: String, require: true },
    foto: { type: String, require: true, max: 30 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
});
exports.productosModel = mongoose_1.default.model(productosCollection, productosSchema);
