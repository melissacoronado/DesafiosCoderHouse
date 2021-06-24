import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export interface IProd{  
    //Propiedades
    id?: number  
    title:string
    price:number
    thumbnail:string
}

const ProductoSchema = new Schema({
    title: String,
    price: Number,
    thumbnail: String
});

const ProductoModel = mongoose.model('productos', ProductoSchema);

export default class persistenciaMongo {
    constructor() {
        ;( async () => {
            try {
                await mongoose.connect('mongodb://localhost/mvc', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                });
                console.log('Base de datos conectada')
            }
            catch(error) {
                console.log(error)
            }
        })()
    }
    obtenerProductos = async () => {
        try {
            return await ProductoModel.find({}).lean()
        }
        catch(error) {
            console.log(error)
        }
    }
    agregarProducto = async (producto: IProd) => {
        try {
            const instance = new ProductoModel(producto);
            await instance.save()
        }
        catch(error) {
            console.log(error)
        }
    }
}