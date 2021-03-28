import mongoose from 'mongoose';
  // BRING IN YOUR SCHEMAS & MODELS
  require('../models/mensajes');
  require('../models/productos');

var dbURI = 'mongodb://localhost:27017/ecommerce'; 
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// Eventos
mongoose.connection.on('connected', function () {
    console.log('Conexión con Mongoose abierta con: ' + dbURI);
  }); 

  mongoose.connection.on('error',function (err) { 
    console.log('Conexión con Mongoose error: ' + err);
  }); 

  mongoose.connection.on('disconnected', function () { 
    console.log('Conexión con Mongoose desconectada'); 
  });
  
  process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
      console.log('Conexión con Mongoose desconectada por culminación de la app'); 
      process.exit(0); 
    }); 
  }); 
  
