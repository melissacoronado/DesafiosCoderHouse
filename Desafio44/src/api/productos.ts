import config from '../helper/config';
import FactoryProductoModel from '../models/factory/productos'

class ApiNoticias {
    productosDAO: any;

    constructor() {
        this.productosDAO = FactoryProductoModel.set(config.TIPO_PERSISTENCIA)
    }

    async obtenerProductos() { return await this.productosDAO.obtenerProductos() }

    
       
}

export default ApiNoticias
