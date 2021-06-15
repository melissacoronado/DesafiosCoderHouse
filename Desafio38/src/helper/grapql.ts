var { graphqlHTTP }  = require('express-graphql');
var { buildSchema } = require('graphql');
import { Producto } from '../service/productos'

let opsProd = new Producto()

// GraphQL schema
//https://graphql.org/graphql-js/basic-types/
export const schema = buildSchema(`
    type Query {
        productos: [Producto],
        producto(id: String!): Producto
    },
    type Mutation {
        insertProduct(nombre: String!, descripcion: String!, codigo: String!, foto: String!, precio: Float!, stock: Float!): Producto
    },
    type Producto {
        id: String
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Float
        stock: Float
    }    
`);

let getProducto = async function(args: any) { 
    var id = args.id;
    opsProd.productos =  await opsProd.showProducts();
    const product =  opsProd.productos.find(x => x.id === id)

    return product;
}

let getProductos = async function(args: any) { 
    var id = args.id;
    opsProd.productos =  await opsProd.showProducts()
    
    return opsProd.productos;
}

let insertProduct = async function(nombre: any, descripcion: any, codigo: any, foto: any, precio: any, stock: any) {
 
    let timestamp = new Date(Date.now());
    const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

    return await opsProd.addProduct(newProduct)    
}

// Root resolver
export const root = {
    productos: getProductos,
    producto: getProducto,
    insertProduct: insertProduct
};

