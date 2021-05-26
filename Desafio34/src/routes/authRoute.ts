import express, {Application, Request, Response} from 'express'
import { Usuario } from '../service/users';
import { ddb, ddbTable, sns, snsTopic } from '../server'

var router = express.Router();
let usrs = new Usuario()


router.get('/login', async (req: Request, res: Response) => {  
    try{  
        res.render('partials/main', {layout : 'login'});
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})


router.post('/signup', async (req: Request, res: Response) => {  
    
    //res.render('partials/main', {layout : 'index', user: req.body.name });
    try{    
        var item = {
            'email': {'S': req.body.email},
            'name': {'S': req.body.name},
            //'preview': {'S': req.body.previewAccess},
            //'theme': {'S': req.body.theme}
        };
        console.log(`ddb ${ddb} ddbTable ${ddbTable} item ${item}`);

        ddb.putItem({
            'TableName': ddbTable,
            'Item': item,
            'Expected': { email: { Exists: false } }        
        }, function(err: any, data: any) {
            console.log(`err ${err} data ${data}`)
            if (err) {
                var returnStatus = 500;

                if (err.code === 'ConditionalCheckFailedException') {
                    returnStatus = 409;
                }

                res.status(returnStatus).end();
                console.log('DDB Error: ' + err);
            } else {
                sns.publish({
                    'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email, 
                                        //+ "\r\nPreviewAccess: " + req.body.previewAccess 
                                        //+ "\r\nTheme: " + req.body.theme,
                    'Subject': 'New user sign up!!!',
                    'TopicArn': snsTopic
                }, function(err: any, data: any) {
                    if (err) {
                        res.status(500).end();
                        console.log('SNS Error: ' + err);
                    } else {
                        res.status(201).end();
                    }
                });   
                res.render('partials/main', {layout : 'index', user: req.body.name });         
            }
        });
        
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
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

router.get('/saludar', async (req: Request, res: Response) => {  
    try{  
        res.status(200).json({error : 'Hola aws.'})
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})

export const AuthUsers: express.Router = router;