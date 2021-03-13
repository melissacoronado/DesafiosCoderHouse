const options = require ('./options/Sqlite3')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./bd/mensajes.db.sqlite"
    },
    useNullAsDefault: false
  })

//Creacion de tabla
knex.schema.createTable('mensajes', table =>{
    table.increments();
    table.string('mail');
    table.timestamps('time');
    table.string('message');
})
.then(() => console.log('Table Created'))
.catch((error) => console.error(error))
.finally(() => knex.destroy())