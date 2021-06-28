import { Producto } from '../service/productos';
const assert = require('assert').strict

let opsProd = new Producto()
const request = require('supertest')('http://localhost:8080')

describe("test de integración de Productos", function() {

    it('debería mostrar listado de productos existentes', async () => {
        //let listado = await opsProd.showProducts();
        let listado = await request.get('/api/productos/')
        //expect(listado).to.include.keys('data')
        assert.notEqual(listado.length, 0);
        //done();
    })

});