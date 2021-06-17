"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsers = exports.passport = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../service/users");
const enviarMail_1 = require("../helper/enviarMail");
const sms_1 = require("../helper/sms");
exports.passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var router = express_1.default.Router();
let usrs = new users_1.Usuario();
router.post('/crear', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('post productos');
        const { nombre, email } = req.body;
        yield usrs.addUser(nombre, email);
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo agregar el Producto.' });
        console.log(error);
    }
}));
router.get('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('partials/main', { layout: 'generic' });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando register' });
        console.log(error);
    }
}));
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('partials/main', { layout: 'login' });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
router.post('/login', exports.passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    console.log('POST Login');
    let userLogin = req.user;
    console.log(userLogin);
    res.render('partials/main', { layout: 'home', userEmail: userLogin.email });
});
router.post('/logout', (req, res) => {
    //console.log('/auth/logout');
    //req.session.destroy(function (err) {
    //console.log('session.destroy');
    const mailOptions2 = {
        from: 'Ecommerce Cerrar sesión',
        to: 'tod.emmerich@ethereal.email',
        subject: `LogOut ${req.session.userLogin} ${new Date()}`,
        html: "<h3>Ha finalziado su sesión con facebook</h3>"
    };
    enviarMail_1.sendMail(mailOptions2);
    res.redirect('/auth/login');
    //});
});
router.get('/info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        };
        //console.log(response);
        res.render('partials/processInfo', { layout: 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
router.get('/infoconsole', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        };
        console.log(response);
        res.render('partials/processInfo', { layout: 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
router.get('/saludar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fechaHora = new Date();
        //console.log(fechaHora);
        //1 * 2.- mail utilizando una cuenta de ethereal
        const mailOptions2 = {
            from: 'Módulo Node.js',
            to: 'tod.emmerich@ethereal.email',
            subject: "correo Saludar",
            html: "mensaje"
        };
        enviarMail_1.sendMail(mailOptions2);
        //3.- email utilizando gmail
        const GmailOptions = {
            from: 'Envio correo Gmail',
            to: 'melissa_coronado@hotmail.com',
            subject: `Mail desde gmail`,
            html: "<h3>Hola desde gmail</h3>"
        };
        //sendGMail(GmailOptions);
        //4.- enviará un SMS a un número elegido
        const Sms = {
            body: 'Hola soy un SMS desde Node.js!',
            messagingServiceSid: 'MG85350b9515bee15aed8865cd9f0ca26d',
            to: '+5491123958498'
        };
        sms_1.sendSMS(Sms);
        res.status(200).json({ response: 'Correo enviado.' });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
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
exports.AuthUsers = router;
