const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect


describe('test api rest full', () => {
    describe('GET', () => {
        it('debería mostrar listado de productos existentes', async () => {
            let response = await request.get('/api/productos/')
            //console.log(response.status)
            console.log(response.body)
            expect(response.status).to.eql(200)
        })
    })
});