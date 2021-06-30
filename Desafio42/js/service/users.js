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
exports.Usuario = void 0;
const usuarios_1 = require("../models/usuarios");
class Usuario {
    constructor() {
        this.addUser = (nombre, email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Usr = new usuarios_1.usuariosModel({ nombre, email });
                yield Usr.save()
                    .then(() => console.log("Usuario Guardado"))
                    .catch((err) => console.log(err));
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.getUser = (nombreUsr, emailUsr) => __awaiter(this, void 0, void 0, function* () {
            try {
                let User = "";
                yield usuarios_1.usuariosModel.find({ nombre: nombreUsr, email: emailUsr })
                    .then((usuario) => {
                    console.log(usuario);
                    User = usuario;
                })
                    .catch((error) => console.log(error));
                return User;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Usuario = Usuario;
