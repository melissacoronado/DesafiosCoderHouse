import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../service/productos'
import { IChat, ChatMsg } from '../service/mensajes'
import { Usuario } from '../service/users'

let opsChat = new ChatMsg()
let opsProd = new Producto()
let opsUsrs = new Usuario()

var router = express.Router()


router.get('/productos/vista', async (req: Request, res: Response) => {  
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
        //productosMock = opsProd.generateProducts(cant)
        console.log('CantProd: ' + productosMock.length);
        res.render('partials/mockprods', { layout : 'indexmock', ListaProductos: "" /*productosMock*/ });
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})







router.post('/productos/vista', (req: Request, res: Response) => {
    console.log('POST /productos/vista');
    if(req.body.nombre && req.body.email &&req.session){
        //verificar si usuario existe sino crear
        const usuario = opsUsrs.getUser(req.body.nombre, req.body.email);
        if(!usuario){
            opsUsrs.addUser(req.body.nombre, req.body.email);
        }
        if(! req.session.user){
            req.session.createdAt = Date.now();
            console.log('Set req.session.createdAt'+req.session.createdAt);
        }
        req.session.user  = req.body.user;
        res.render('partials/main', {layout : 'index', user: req.session.user });
       
    }
})



export const RouterViewsProductos: express.Router = router;