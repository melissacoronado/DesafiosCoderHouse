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
const axios = require('axios');
const ListarProds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prods = yield axios.get('http://localhost:8080/api/productos/');
        console.log(prods.data);
    }
    catch (err) {
        console.log(err);
    }
});
const AddProds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProd = {
            "nombre": "Cereza3",
            "descripcion": "Cerezas3",
            "codigo": "c-1013",
            "foto": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-128.png",
            "precio": "220",
            "stock": "400"
        };
        const prods = yield axios.post('http://localhost:8080/api/productos/', newProd);
        console.log(prods.data);
    }
    catch (err) {
        console.log(err);
    }
});
const UpdateProds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateProd = {
            "nombre": "Cereza 3",
            "descripcion": "Cerezas 333",
            "codigo": "c-1013",
            "foto": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-128.png",
            "precio": "300",
            "stock": "400"
        };
        const prods = yield axios.patch('http://localhost:8080/api/productos/actualizar/60ca8d85de633e3fdcab91cc', updateProd);
        console.log(prods.data);
    }
    catch (err) {
        console.log(err);
    }
});
const DeleteProds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prods = yield axios.delete('http://localhost:8080/api/productos/borrar/60ca8dee7497b2511cef8121');
        console.log(prods.data);
    }
    catch (err) {
        console.log(err);
    }
});
ListarProds();
//AddProds();
//UpdateProds();
//DeleteProds();
