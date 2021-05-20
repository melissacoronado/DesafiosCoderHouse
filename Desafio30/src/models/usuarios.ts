import mongoose from 'mongoose';

const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    mail: { type: String, require: true, max: 30 },
    name: { type: String, require: true, max: 100 }
});

export const usuariosModel = mongoose.model(usuariosCollection, usuariosSchema);