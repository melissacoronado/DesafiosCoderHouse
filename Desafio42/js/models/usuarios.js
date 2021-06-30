"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuariosCollection = 'usuarios';
const usuariosSchema = new mongoose_1.default.Schema({
    mail: { type: String, require: true, max: 30 },
    name: { type: String, require: true, max: 100 }
});
exports.usuariosModel = mongoose_1.default.model(usuariosCollection, usuariosSchema);
