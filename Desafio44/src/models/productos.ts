import mongoose from 'mongoose';

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    //id: {type: Number },
    timestamp: { type: Date, require: true },
    nombre: { type: String, require: true, max: 30 },
    descripcion: { type: String, require: true, max: 100 },
    codigo: { type: String, require: true },
    foto: { type: String, require: true, max: 30 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
});

export const productosModel = mongoose.model(productosCollection, productosSchema);