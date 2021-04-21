import express, {Application, Request, Response} from 'express'
//import { copyFileSync } from 'fs'
import { IProd, Producto } from '../service/productos'
import { IChat, ChatMsg } from '../service/mensajes'

//import { opsProd } from '../server'
let opsChat = new ChatMsg()
let opsProd = new Producto()

var router = express.Router()


// middleware function to check for logged-in users
var sessionChecker = (req: Request, res: Response, next: any) => {
    if (req.session && req.session.user) {
        const expires = req.session.createdAt + 60000 // expiration date
        const ttl = expires - Date.now() // maximum time to life
        //console.log(expires + '*' + ttl);
        //Aqui no toy segura
        if (ttl > 60000) {
            res.redirect('/api/login');
          }

        console.log('Sesion createdAt'+req.session.createdAt);
        console.log('MaxAge'+req.session.cookie.maxAge);
        //res.redirect('/api/productos/vista');
    } else {
        console.log('No Sesion ');
        //next();
    }  
    next();  
};


router.get('/productos/vista', sessionChecker, async (req: Request, res: Response) => {  
    try{  
        console.log('GET /productos/vista');
        if(req.session){
            console.log('Sesion createdAt'+req.session.createdAt);
            req.session.createdAt = req.session.createdAt + 60000;//Con esto la reinicio?
        }

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
        res.render('partials/main', {layout : 'login'});
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})

router.post('/productos/vista', sessionChecker, (req: Request, res: Response) => {
    console.log('POST /productos/vista');
    if(req.body.user && req.session){
        if(! req.session.user){
            req.session.createdAt = Date.now();
            console.log('Set req.session.createdAt'+req.session.createdAt);
        }
        req.session.user  = req.body.user;
        res.render('partials/main', {layout : 'index', user: req.session.user });
    }
})

router.post('/logout', (req, res) => {
    try{  
        console.log('POST logout'); 
        if (req.session && req.session.user) {
            let userBye = req.session.user;
            req.session.destroy((err) => {
                if(err) { console.log(err); }      
            });
            res.render('partials/main', {layout : 'logout', user: userBye });                
        }         
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }    
});

export const RouterViewsProductos: express.Router = router;