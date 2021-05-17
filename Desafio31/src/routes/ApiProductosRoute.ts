import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../service/productos'
import { log4js } from '../server'

//const logger = log4js.getLogger();
let opsProd = new Producto()

var router = express.Router()


router.get('/', async (req: Request, res: Response) => {  
    try{        
        const products =  await opsProd.showProducts()
        if (products.length == 0){
            logger.warn("No hay productos cargados.");
            res.status(404).json({error : 'No hay productos cargados.'})
            return;
        }else{
            logger.info("Obtener productos Ok");
            res.status(200).send(products)
            return;
        }
    }catch(error){
        logger.error(error);
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

router.post('/productos', async (req: Request, res: Response) => {  
    try{    
        console.log('post productos');
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body  
        
        //Falta validar que vengan todos los parametros              
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

        await opsProd.addProduct(newProduct)       
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

router.patch('/actualizar/:id', async (req: Request, res: Response) => { 
    try{    
        const id: any = req.params.id //Viene de la url/1 y el + para parsear a numero
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

        const { nombre, descripcion, codigo, foto, precio, stock } = req.body  
        await opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock)
        
        res.status(200).json({Respuesta: "Producto Modificado!"})        
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
        console.error(error)
    }
})

router.delete('/borrar/:id', async (req: Request, res: Response) => {  
    try{    
        const id: any = req.params.id 
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