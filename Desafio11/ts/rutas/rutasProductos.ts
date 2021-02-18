import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../bd'
var router = express.Router()



let opsProd = new Producto()

router.get('/productos', (req: Request, res: Response) => {  
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

router.get('/productos/vista', (req: Request, res: Response) => {  
    try{         
        //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
        res.render('pages/index', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})

router.get('/productos/vistaAddProducto', (req: Request, res: Response) => {  
    try{         
        //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
        res.render('pages/addProducts', {layout : 'index' });
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})

router.get('/productos/:id', (req: Request, res: Response) => {  
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

router.post('/productos', (req: Request, res: Response) => {  
    try{    
        const { title, price, thumbnail } = req.body  
        //Falta validar que vengan todos los parametros              
        const newProduct = { title, price, thumbnail }

        opsProd.addProduct(newProduct)
        //alert("Producto agregado!")
        //res.status(201).send("Producto agregado!")        
        res.render('pages/addProducts');
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

router.patch('/productos/actualizar/:id', (req: Request, res: Response) => { 
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

router.delete('/productos/borrar/:id', (req: Request, res: Response) => {  
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





export const RouterProductos: express.Router = router;