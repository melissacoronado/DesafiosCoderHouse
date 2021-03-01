import express, {Application, Request, Response} from 'express'
import { copyFileSync } from 'fs'
import { IProd, Producto } from '../bd'

import { opsProd } from '../server'


var router = express.Router()

router.get('/productos/vista', (req: Request, res: Response) => {  
    try{         
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})

router.post('/productos', (req: Request, res: Response) => {  
    try{    
        console.log('post productos');
        const { title, price, thumbnail } = req.body  
        
        //Falta validar que vengan todos los parametros              
        const newProduct = { title, price, thumbnail }

        opsProd.addProduct(newProduct)       
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

export const RouterViewsProductos: express.Router = router;