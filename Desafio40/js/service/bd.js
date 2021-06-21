"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// BRING IN YOUR SCHEMAS & MODELS
require('../models/mensajes');
require('../models/productos');
//var dbURI = 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 
var dbURI = 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose_1.default.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error)
        throw new Error(`Error en la conexión a la BD ${error}`);
    console.log(error);
});
// Eventos
mongoose_1.default.connection.on('connected', function () {
    console.log('Conexión con Mongoose abierta con: ' + dbURI);
});
mongoose_1.default.connection.on('error', function (err) {
    console.log('Conexión con Mongoose error: ' + err);
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log('Conexión con Mongoose desconectada');
});
process.on('SIGINT', function () {
    mongoose_1.default.connection.close(function () {
        console.log('Conexión con Mongoose desconectada por culminación de la app');
        process.exit(0);
    });
});
