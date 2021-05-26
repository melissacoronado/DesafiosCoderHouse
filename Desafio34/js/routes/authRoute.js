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
exports.AuthUsers = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../service/users");
const server_1 = require("../server");
var router = express_1.default.Router();
let usrs = new users_1.Usuario();
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('partials/main', { layout: 'login' });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.render('partials/main', {layout : 'index', user: req.body.name });
    try {
        var item = {
            'email': { 'S': req.body.email },
            'name': { 'S': req.body.name },
            //'preview': {'S': req.body.previewAccess},
            //'theme': {'S': req.body.theme}
        };
        console.log(`ddb ${server_1.ddb} ddbTable ${server_1.ddbTable} item ${item}`);
        server_1.ddb.putItem({
            'TableName': server_1.ddbTable,
            'Item': item,
            'Expected': { email: { Exists: false } }
        }, function (err, data) {
            console.log(`err ${err} data ${data}`);
            if (err) {
                var returnStatus = 500;
                if (err.code === 'ConditionalCheckFailedException') {
                    returnStatus = 409;
                }
                res.status(returnStatus).end();
                console.log('DDB Error: ' + err);
            }
            else {
                server_1.sns.publish({
                    'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email,
                    //+ "\r\nPreviewAccess: " + req.body.previewAccess 
                    //+ "\r\nTheme: " + req.body.theme,
                    'Subject': 'New user sign up!!!',
                    'TopicArn': server_1.snsTopic
                }, function (err, data) {
                    if (err) {
                        res.status(500).end();
                        console.log('SNS Error: ' + err);
                    }
                    else {
                        res.status(201).end();
                    }
                });
                res.render('partials/main', { layout: 'index', user: req.body.name });
            }
        });
    }
    catch (error) {
        res.status(404).json({ error: 'No se pudo agregar el Producto.' });
        console.log(error);
    }
}));
router.post('/logout', (req, res) => {
    try {
        console.log('POST logout');
        if (req.session && req.session.user) {
            let userBye = req.session.user;
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.render('partials/main', { layout: 'logout', user: userBye });
        }
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
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
        res.status(200).json({ error: 'Hola aws.' });
    }
    catch (error) {
        res.status(404).json({ error: 'Error mostrando Login de usuario.' });
        console.log(error);
    }
}));
exports.AuthUsers = router;
