import express, {Application, Request, Response} from 'express'
//import { copyFileSync } from 'fs'
import { IProd, Producto } from '../bd/productos'
import { IChat, ChatMsg } from '../bd/mensajes'

//import { opsProd } from '../server'
let opsChat = new ChatMsg()
let opsProd = new Producto()

var router = express.Router()

router.get('/productos/vista', async (req: Request, res: Response) => {  
    try{  
        opsProd.productos = await opsProd.showProducts()
        opsChat.ChatMessages =  await opsChat.getMessages()  
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos, ListaMsjChat: opsChat.ChatMessages});
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})

router.post('/productos', (req: Request, res: Response) => {  
    try{    
        console.log('post productos');
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body  
        
        //Falta validar que vengan todos los parametros              
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

        opsProd.addProduct(newProduct)       
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

export const RouterViewsProductos: express.Router = router;