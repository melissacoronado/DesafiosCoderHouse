"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductoSchema = new Schema({
    title: String,
    price: Number,
    thumbnail: String
});
const ProductoModel = mongoose_1.default.model('productos', ProductoSchema);
class persistenciaMongo {
    constructor() {
        this.obtenerProductos = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductoModel.find({}).lean();
            }
            catch (error) {
                console.log(error);
            }
        });
        this.agregarProducto = (producto) => __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new ProductoModel(producto);
                yield instance.save();
            }
            catch (error) {
                console.log(error);
            }
        });
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect('mongodb://localhost/mvc', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                });
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log(error);
            }
        }))();
    }
}
exports.default = persistenciaMongo;
