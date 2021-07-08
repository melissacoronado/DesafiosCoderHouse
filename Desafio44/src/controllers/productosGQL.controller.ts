import ApiProductos from '../api/productos'

class ControladorProductosGQL {
    apiProductos:any = null;

    constructor() {
        this.apiProductos = new ApiProductos()
    }

    obtenerProductos = async () => {
        try {
            let productos = await this.apiProductos.obtenerProductos()

            return productos
        }
        catch(error) {
            console.log('error obtenerProductos', error)
        }
    }

    
}

export default ControladorProductosGQL