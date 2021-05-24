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
exports.AuthUsers = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../service/users");
var router = express_1.default.Router();
let usrs = new users_1.Usuario();
router.post('/crear', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('post productos');
        const { nombre, email } = req.body;
        yield usrs.addUser(nombre, email);
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo agregar el Producto.' });
        console.log(error);
    }
}));
exports.AuthUsers = router;
