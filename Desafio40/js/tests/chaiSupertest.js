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
const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
describe('test api rest full', () => {
    describe('GET', () => {
        it('debería mostrar listado de productos existentes', () => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield request.get('/api/productos/');
            //console.log(response.status)
            console.log(response.body);
            expect(response.status).to.eql(200);
        }));
    });
});
