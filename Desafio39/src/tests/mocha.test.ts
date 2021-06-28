import { Producto } from '../service/productos';
const assert = require('assert').strict

let opsProd = new Producto()

describe("test de integración de Productos", function() {

    it('debería mostrar listado de productos existentes', async () => {
        let listado = await opsProd.showProducts();
        //expect(listado).to.include.keys('data')
        assert.notEqual(listado.length, 0);
    })

});