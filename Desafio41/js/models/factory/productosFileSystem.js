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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class persistenciaFileSystem {
    constructor() {
        this.obtenerProductos = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let datos = yield fs_1.default.promises.readFile('productos.txt');
                return JSON.parse(datos.toString());
            }
            catch (error) {
                console.log(error);
            }
        });
        this.agregarProductos = (producto) => __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = JSON.parse(yield fs_1.default.promises.readFile('productos.txt').toString());
                productos.push(producto);
                yield fs_1.default.promises.writeFile('productos.txt', JSON.stringify(productos));
            }
            catch (error) {
                console.log(error);
            }
        });
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.readFile('productos.txt');
            }
            catch (_a) {
                yield fs_1.default.promises.writeFile('productos.txt', JSON.stringify([]));
            }
        }))();
    }
}
exports.default = persistenciaFileSystem;
