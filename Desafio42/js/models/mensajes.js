"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mensajesCollection = 'mensajes';
const mensajesSchema = new mongoose_1.default.Schema({
    //id: {type: Number },
    mail: { type: String, require: true, max: 30 },
    time: { type: String, require: true, max: 30 },
    message: { type: String, require: true, max: 100 }
});
exports.mensajesModel = mongoose_1.default.model(mensajesCollection, mensajesSchema);
