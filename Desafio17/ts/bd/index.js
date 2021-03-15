//const options = require ('./options/sqlite3_2')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./mensajes.db.sqlite"
    },
    useNullAsDefault: false
  })

//Creacion de tabla
/*
knex.schema.createTable('mensajes', table =>{
    table.increments();
    table.string('mail');
    table.timestamps('time');
    table.string('message');
})
.then(() => console.log('Table Created'))
.catch((error) => console.error(error))
.finally(() => knex.destroy())

//Listar tablas
knex.select('name')
    .from('sqlite_master')
    .where({type: 'table'})
    .then(rows => console.log(rows))
    .catch(error => console.log(error))
    .finally(() => knex.destroy());
*/
//Listar columnas
knex.select('*')
    .from('sqlite_master')    
    .where({tbl_name: 'mensajes',
            type: 'table'  })
    .then(rows => console.log(rows))
    .catch(error => console.log(error))
    .finally(() => knex.destroy());
