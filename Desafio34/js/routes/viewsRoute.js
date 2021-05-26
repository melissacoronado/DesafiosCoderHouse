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
exports.RouterViewsProductos = void 0;
const express_1 = __importDefault(require("express"));
const productos_1 = require("../service/productos");
const mensajes_1 = require("../service/mensajes");
const users_1 = require("../service/users");
let opsChat = new mensajes_1.ChatMsg();
let opsProd = new productos_1.Producto();
let opsUsrs = new users_1.Usuario();
var router = express_1.default.Router();
router.get('/productos/vista', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /productos/vista');
        if (req.session) {
            console.log('Sesion createdAt' + req.session.createdAt);
            req.session.createdAt = req.session.createdAt + 60000; //Con esto la reinicio?
        }
        opsProd.productos = yield opsProd.showProducts();
        opsChat.ChatMessages = yield opsChat.getMessages();
        res.render('partials/main', { layout: 'index', ListaProductos: opsProd.productos, ListaMsjChat: opsChat.ChatMessages });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando listado de Productos.' });
        console.log(error);
    }
}));
router.get('/productos/vista-test', (req, res) => {
    try {
        let productosMock = [];
        let cant = 0;
        if (req.query.cant) {
            cant = +req.query.cant;
        }
        else {
            cant = 10;
        }
        /*if(cant > 0){
            return res.status(404).json({error : 'No hay Productos disponibles.'});
        }*/
        //productosMock = opsProd.generateProducts(cant)
        console.log('CantProd: ' + productosMock.length);
        res.render('partials/mockprods', { layout: 'indexmock', ListaProductos: "" /*productosMock*/ });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando listado de Productos.' });
        console.log(error);
    }
});
router.post('/productos/vista', (req, res) => {
    console.log('POST /productos/vista');
    if (req.body.nombre && req.body.email && req.session) {
        //verificar si usuario existe sino crear
        const usuario = opsUsrs.getUser(req.body.nombre, req.body.email);
        if (!usuario) {
            opsUsrs.addUser(req.body.nombre, req.body.email);
        }
        if (!req.session.user) {
            req.session.createdAt = Date.now();
            console.log('Set req.session.createdAt' + req.session.createdAt);
        }
        req.session.user = req.body.user;
        res.render('partials/main', { layout: 'index', user: req.session.user });
    }
});
exports.RouterViewsProductos = router;
