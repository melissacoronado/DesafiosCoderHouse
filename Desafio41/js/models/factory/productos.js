"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productosMemory_1 = __importDefault(require("./productosMemory"));
//import persistenciaFileSystem from './productosFileSystem'
//import persistenciaMongo from './productosMongoDB'
/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductoModel {
    static set(opcion) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']');
        switch (opcion) {
            case 'Mem': return new productosMemory_1.default();
            //case 'File': return new persistenciaFileSystem()
            //case 'Mongo': return new persistenciaMongo()
        }
    }
}
const opcion = process.argv[2] || 'Mem';
exports.default = FactoryProductoModel.set(opcion);
