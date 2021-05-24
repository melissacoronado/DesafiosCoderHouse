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
exports.ChatMsg = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ChatMsg {
    constructor(nombreArchivo) {
        this.ChatMessages = [];
        this.FileName = "";
        this.getMessages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(path_1.default.resolve(__dirname, this.FileName), { encoding: 'utf8' });
                let arrayMsj = JSON.parse(data);
                let ChatMsg = arrayMsj.map((val) => ({
                    mail: val.mail,
                    time: val.time,
                    message: val.message
                }));
                return ChatMsg;
            }
            catch (error) {
                console.log('Error Obteniendo datos de .txt');
                return [];
            }
        });
        this.addMessage = (nuevoMsg) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.ChatMessages.push(nuevoMsg);
                const data = yield fs_1.default.promises.writeFile(path_1.default.resolve(__dirname, this.FileName), JSON.stringify(this.ChatMessages));
                console.log("Archivo Guardado");
            }
            catch (error) {
                console.error("No se pudo Guardar el archivo");
                console.log(error);
            }
        });
        this.FileName = nombreArchivo;
    }
}
exports.ChatMsg = ChatMsg;
