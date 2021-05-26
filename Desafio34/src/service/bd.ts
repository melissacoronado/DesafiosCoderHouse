/*import mongoose from 'mongoose';
  // BRING IN YOUR SCHEMAS & MODELS
  require('../models/mensajes');
  require('../models/productos');

//var dbURI = 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 
var dbURI = 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if (error) throw new Error(`Error en la conexión a la BD ${error}`)
        console.log(error)
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
  
*/