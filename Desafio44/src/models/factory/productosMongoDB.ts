import {productosModel} from '../../models/productos'
//const db = require('../../service/bd') 

export interface IProd{  
    //Propiedades
    id?: number  
    title:string
    price:number
    thumbnail:string
}

export default class persistenciaMongo {
    constructor() {
        ;( async () => {
            try {
                /*await mongoose.connect('mongodb://localhost/mvc', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                });*/
                console.log('Base de datos conectada')
            }
            catch(error) {
                console.log(error)
            }
        })()
    }
    obtenerProductos = async () => {
        try {
            return await productosModel.find({}).lean()
        }
        catch(error) {
            console.log(error)
        }
    }
    agregarProducto = async (producto: IProd) => {
        try {
            const instance = new productosModel(producto);
            await instance.save()
        }
        catch(error) {
            console.log(error)
        }
    }
}