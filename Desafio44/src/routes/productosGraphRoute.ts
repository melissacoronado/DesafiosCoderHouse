import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import config from "../helper/config";

import ControladorProductosGQL from '../controllers/productosGQL.controller'

class RouterProductosGQL {
    controladorProductosGQL: any = null;
    constructor() {
        this.controladorProductosGQL = new ControladorProductosGQL()
    }

    start() {
        // GraphQL schema
        const schema = buildSchema(`
            type Query {
                productos: [Producto]
            }
            type Mutation {
                guardarProducto(
                    timestamp: String!,
                    nombre: String!,
                    descripcion: String!,
                    codigo: String!,
                    foto: String!,
                    precio: Float!,
                    stock: Float!,
                ): Producto,
                actualizarProducto(
                    _id: String!,
                    nombre: String!,
                ): Producto,
                borrarProducto(
                    _id: String!,
                ): Producto,                                
            },
            type Producto {
                _id: String
                timestamp: String
                nombre: String
                descripcion: String
                codigo: String
                foto: String
                precio: Float
                stock: Float
            }    
        `);

        // Root resolver
        const root = {
            productos : this.controladorProductosGQL.obtenerProductos()
            //guardarProducto : this.controladorProductosGQL.guardarProducto,
            //actualizarProducto: (_id,nombre) => this.controladorProductosGQL.actualizarProducto(_id,nombre),
            //borrarProducto : _id => this.controladorProductosGQL.borrarProducto(_id)
        };

        return graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: config.GRAPHIQL == 'true'
        })
    }
}

export default RouterProductosGQL