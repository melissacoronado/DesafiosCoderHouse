"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TS_CoronadoMelissa_1 = __importDefault(require("./TS+CoronadoMelissa"));
var operaciones = function () {
    TS_CoronadoMelissa_1.default(4, 5, 'suma').then(function (retorno) { return console.log("El resultado de la Suma es: " + retorno); });
    TS_CoronadoMelissa_1.default(8, 5, 'resta').then(function (retorno) { return console.log("El resultado de la Resta es: " + retorno); });
};
operaciones();
