import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../bd'
var router = express.Router()

let opsProd = new Producto()

router.get('/productos', (req: Request, res: Response) => {  
    try{
        const products =  opsProd.showProducts()
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
        }
        res.status(200).send(products)
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
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
        res.status(201).send("Producto agregado!")        
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
    }
})

router.post('/productos/addProduct', (req: Request, res: Response) => {  
    try{    
        const { title, price, thumbnail } = req.body  
        //console.log(req.body)
        //Falta validar que vengan todos los parametros              
        const newProduct = { title, price, thumbnail }

        opsProd.addProduct(newProduct)
        res.status(201).send("Producto agregado!")        
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
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
        productSelecc!.title = title
        productSelecc!.price = price
        productSelecc!.thumbnail = thumbnail		
        
        res.status(204).json({Respuesta: "Producto Modificado!"})        
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
		
        opsProd.productos = opsProd.productos.splice(id, 1);	//o psProd.productos = psProd.productos.filter(x => x.id !== id);

        res.status(200).send('Producto Eliminado.')   
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})


export const RouterProductos: express.Router = router;