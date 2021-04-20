import express, {Application, Request, Response} from 'express'
//import { copyFileSync } from 'fs'
import { IProd, Producto } from '../service/productos'
import { IChat, ChatMsg } from '../service/mensajes'

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

router.get('/productos/vista-test', (req: Request, res: Response) => {  
    try{ 
        let productosMock = [];
        let cant: number = 0;
        if(req.query.cant){
            cant = +req.query.cant;
        }else{
            cant = 10; 
        }
        /*if(cant > 0){
            return res.status(404).json({error : 'No hay Productos disponibles.'});
        }*/
        productosMock = opsProd.generateProducts(cant)
        console.log('CantProd: ' + productosMock.length);
        res.render('partials/mockprods', { layout : 'indexmock', ListaProductos: productosMock });
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

router.get('/login', async (req: Request, res: Response) => {  
    try{  
        console.log('GET login');
        res.render('partials/main', {layout : 'login'});
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})

router.post('/loginUp', (req: Request, res: Response) => {
    console.log('POST login');
    console.log(req.body);
    if(req.body.user){
        console.log(req.body.user);
        req.session.user  = req.body.user;
        res.render('partials/main', {layout : 'index', user: req.session.user });

    }
})

router.get('/logout', (req, res) => {
    if (req.session && req.session.user) {
        res.clearCookie('user');
    } 
    res.redirect('/api/login');
    
});

export const RouterViewsProductos: express.Router = router;