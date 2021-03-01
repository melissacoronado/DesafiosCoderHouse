import express, {Application, Request, Response} from 'express'
import { copyFileSync } from 'fs'
import { IProd, Producto } from '../bd'

import { opsProd } from '../server'


var router = express.Router()


router.get('/', (req: Request, res: Response) => {  
    try{        
        const products =  opsProd.showProducts()
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
        }else{
            res.status(200).send(products)
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
    }
})


router.get('/:id', (req: Request, res: Response) => {  
    try{
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        const product =  opsProd.productos.find(x => x.id === id)

        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

        if (product === null)
            res.status(404).json({error : 'Producto no encontrado'})

        res.status(200).send(product)
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el Producto solicitado.'})
    }
})

router.patch('/actualizar/:id', (req: Request, res: Response) => { 
    try{    
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

        const productSelecc =  opsProd.productos.find(x => x.id === id)        
		if (productSelecc === null)
			res.status(404).json({error : 'Producto no encontrado'})
        
        const { title, price, thumbnail } = req.body  
        opsProd.updateProducts(id, title, price, thumbnail)
        
        res.status(200).json({Respuesta: "Producto Modificado!"})        
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
    }
})

router.delete('/borrar/:id', (req: Request, res: Response) => {  
    try{    
        const id: number = +req.params.id 
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

		const product =  opsProd.productos.find(x => x.id === id)		
		if (product === null)
			res.status(404).json({error : 'Producto no encontrado'})
		
        opsProd.deleteProduct(id)
        res.status(200).send('Producto Eliminado.')   
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})





export const RouterApiProductos: express.Router = router;