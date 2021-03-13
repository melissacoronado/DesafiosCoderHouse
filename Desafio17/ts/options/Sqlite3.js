const options = {
    client: 'sqlite3',
    connection: {
      filename: "../bd/mensajes.db.sqlite"
    },
    useNullasDefault: true
  };

  module.exports = {
    options
  }