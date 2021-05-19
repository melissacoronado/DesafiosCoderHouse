import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../service/productos'
import { IChat, ChatMsg } from '../service/mensajes'
import { Usuario } from '../service/users'

let opsChat = new ChatMsg()
let opsProd = new Producto()
let opsUsrs = new Usuario()

var router = express.Router()


// middleware function to check for logged-in users
var sessionChecker = (req: Request, res: Response, next: any) => {
    if (req.session){
        if(!req.session.user) {
            res.redirect('/api/login');
        }        
        //console.log('Sesion createdAt'+req.session.createdAt);
        console.log('MaxAge'+req.session.cookie.maxAge);
        //res.redirect('/api/productos/vista');
    } else {
        console.log('No Sesion ');
        res.redirect('/api/login');
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
        //productosMock = opsProd.generateProducts(cant)
        console.log('CantProd: ' + productosMock.length);
        res.render('partials/mockprods', { layout : 'indexmock', ListaProductos: "" /*productosMock*/ });
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
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

router.get('/info', async (req: Request, res: Response) => {  
    try{  
        const mensaje = 'Info';
        //res.send(mensaje.repeat(1000));
        let response = {
            Plataform: process.platform,
            NodeVer: process.version,
            MemoryUse: process.memoryUsage(),
            PathExec: process.env['PATH'],            
            ProcessId: process.pid,
            FolderC: process.cwd(),
            numCpus: require('os').cpus().length
        };
        let arrArgV1 = process.argv[0];
        let arrArgV2 = process.argv[1];
        let arrArgV = {
            arg1: arrArgV1,
            arg2: arrArgV2
        }
        //console.log(response);
        res.render('partials/processInfo', {layout : 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });

    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})

router.get('/infoconsole', async (req: Request, res: Response) => {  
    try{  
        const mensaje = 'Info';
        //res.send(mensaje.repeat(1000));
        let response = {
            Plataform: process.platform,
            NodeVer: process.version,
            MemoryUse: process.memoryUsage(),
            PathExec: process.env['PATH'],            
            ProcessId: process.pid,
            FolderC: process.cwd(),
            numCpus: require('os').cpus().length
        };
        let arrArgV1 = process.argv[0];
        let arrArgV2 = process.argv[1];
        let arrArgV = {
            arg1: arrArgV1,
            arg2: arrArgV2
        }
        console.log(response);
        res.render('partials/processInfo', {layout : 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });

    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})

export const RouterViewsProductos: express.Router = router;