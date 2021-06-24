import express from 'express'
import { getProductos, getProductosById, postProductos, patchProductos, deleteProductos } from '../controllers/productos.controller';


var router = express.Router()

router.get('/', getProductos);

router.get('/:id', getProductosById);

router.post('/', postProductos);

router.patch('/actualizar/:id', patchProductos);

router.delete('/borrar/:id', deleteProductos);


export const RouterProductos: express.Router = router;