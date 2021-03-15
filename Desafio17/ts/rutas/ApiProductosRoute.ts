import express, {Application, Request, Response} from 'express'
import { copyFileSync } from 'fs'
import { IProd, Producto } from '../bd/bd'

let opsProd = new Producto()

var router = express.Router()


router.get('/', async (req: Request, res: Response) => {  
    try{        
        const products =  await opsProd.showProducts()
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
            return;
        }else{
            res.status(200).send(products)
            return;
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
    }
})


router.get('/:id', async (req: Request, res: Response) => {  
    try{
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        opsProd.productos =  await opsProd.showProducts()
        const product =  opsProd.productos.find(x => x.id === id)

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

        if (product === null){
            res.status(404).json({error : 'Producto no encontrado'})
            return;
        }

        res.status(200).send(product)
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el Producto solicitado.'})
    }
})

router.patch('/actualizar/:id', async (req: Request, res: Response) => { 
    try{    
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        opsProd.productos =  await opsProd.showProducts()

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

        const productSelecc =  opsProd.productos.find(x => x.id === id)        
		if (productSelecc === null){
			res.status(404).json({error : 'Producto no encontrado'})
            return;
        }
        
        const { title, price, thumbnail } = req.body  
        await opsProd.updateProducts(id, title, price, thumbnail)
        
        res.status(200).json({Respuesta: "Producto Modificado!"})        
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
        console.error(error)
    }
})

router.delete('/borrar/:id', async (req: Request, res: Response) => {  
    try{    
        const id: number = +req.params.id 
        opsProd.productos =  await opsProd.showProducts()

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

		const product =  opsProd.productos.find(x => x.id === id)		
		if (product === null){
			res.status(404).json({error : 'Producto no encontrado'})
            return;
        }
		
        await opsProd.deleteProduct(id)
        res.status(200).send('Producto Eliminado.')   
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})





export const RouterApiProductos: express.Router = router;