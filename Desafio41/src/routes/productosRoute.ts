import express from 'express'
//import { getProductos, getProductosById, postProductos, patchProductos, deleteProductos } from '../controllers/productos.controller';

import * as ControladorProductos from '../controllers/productos.controller'

var router = express.Router()

router.get('/', ControladorProductos.getProductos);

router.get('/:id', ControladorProductos.getProductosById);

router.post('/', ControladorProductos.postProductos);

router.patch('/actualizar/:id', ControladorProductos.patchProductos);

router.delete('/borrar/:id', ControladorProductos.deleteProductos);


export const RouterProductos: express.Router = router;