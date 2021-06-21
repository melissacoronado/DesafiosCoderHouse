import express, {Application, Request, Response} from 'express'
import { Usuario } from '../service/users';
import { sendMail, sendGMail } from '../helper/enviarMail'
import { sendSMS } from '../helper/sms'
export const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var router = express.Router();
let usrs = new Usuario()

router.post('/crear', async (req: Request, res: Response) => {  
    try{    
        console.log('post productos');
        const { nombre, email } = req.body  
        await usrs.addUser(nombre, email);
        
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

router.get('/register', async (req: Request, res: Response) => {  
    try{  
        res.render('partials/main', {layout : 'generic'});
    }catch(error){
        res.status(404).json({error : 'Error mostrando register'})
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

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
      console.log('POST Login');
    let userLogin = (<any>req).user;
    console.log(userLogin);
    res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
});

router.post('/logout', (req: Request, res: Response) => {
    //console.log('/auth/logout');
    //req.session.destroy(function (err) {
        //console.log('session.destroy');
        const mailOptions2 = {
            from: 'Ecommerce Cerrar sesión',
            to: 'tod.emmerich@ethereal.email',
            subject: `LogOut ${req.session!.userLogin} ${new Date()}`,
            html: "<h3>Ha finalziado su sesión con facebook</h3>"
        }
        sendMail(mailOptions2);
     

        res.redirect('/auth/login'); 
    //});
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
        let fechaHora = new Date();
        //console.log(fechaHora);
        //1 * 2.- mail utilizando una cuenta de ethereal
        const mailOptions2 = {
            from: 'Módulo Node.js',
            to: 'tod.emmerich@ethereal.email',
            subject: "correo Saludar",
            html: "mensaje"
        }
        sendMail(mailOptions2);

        //3.- email utilizando gmail
        const GmailOptions = {
            from: 'Envio correo Gmail',
            to: 'melissa_coronado@hotmail.com',
            subject: `Mail desde gmail`,
            html: "<h3>Hola desde gmail</h3>"
        }
        //sendGMail(GmailOptions);

        //4.- enviará un SMS a un número elegido
        const Sms = {
            body: 'Hola soy un SMS desde Node.js!',
            messagingServiceSid: 'MG85350b9515bee15aed8865cd9f0ca26d',
            to: '+5491123958498'
        }
        sendSMS(Sms);

        res.status(200).json({response : 'Correo enviado.'})
    }catch(error){
        res.status(404).json({error : 'Error mostrando Login de usuario.'})
        console.log(error)
    }
})
/*
router.get('/auth/facebook',passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),//sucessRedirect: '/home'
    function(req, res) {
        let userLogin = (<any>req).user;
        
        const mailOptions2 = {
            from: 'Ecommerce passport Facebook',
            to: 'tod.emmerich@ethereal.email',
            subject: `LogIn ${userLogin} ${new Date()}`,
            html: "<h3>Ha iniciado sesión con facebook</h3>>"
        }

        sendMail(mailOptions2);
        res.render('partials/main', {layout : 'home', userEmail: userLogin.email});


        
    }
);
*/



export const AuthUsers: express.Router = router;