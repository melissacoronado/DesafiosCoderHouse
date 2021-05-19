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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMsg = void 0;
const mensajes_1 = require("../models/mensajes");
class ChatMsg {
    constructor() {
        this.ChatMessages = [];
        this.getMessages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let ChatMsg = [];
                yield mensajes_1.mensajesModel.find({})
                    .then((mensajes) => {
                    if (mensajes.length > 0) {
                        ChatMsg = mensajes.map((val) => ({
                            mail: val.mail,
                            time: (new Date(val.time).toLocaleString()),
                            message: val.message
                        }));
                    }
                })
                    .catch((error) => console.log(error));
                return ChatMsg;
            }
            catch (error) {
                console.log('Error Obteniendo datos de la BD.');
                console.error(error);
                return [];
            }
        });
        this.addMessage = (nuevoMsg) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(nuevoMsg);
                const Msg = new mensajes_1.mensajesModel(nuevoMsg);
                yield Msg.save()
                    .then(() => console.log("Mensaje Guardado"))
                    .catch((err) => console.log(err));
            }
            catch (error) {
                console.error("No se pudo Guardar el Mensaje");
                //console.log(error)
            }
        });
    }
}
exports.ChatMsg = ChatMsg;
