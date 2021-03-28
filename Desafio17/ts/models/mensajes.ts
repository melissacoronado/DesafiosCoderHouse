import mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const usuariosSchema = new mongoose.Schema({
    //id: {type: Number },
    mail: { type: String, require: true, max: 30 },
    time: { type: String, require: true, max: 30 },
    message: { type: String, require: true, max: 100 }
});

export const mensajesModel = mongoose.model(mensajesCollection, usuariosSchema);