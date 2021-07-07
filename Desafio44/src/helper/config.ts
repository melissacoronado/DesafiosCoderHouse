const dotenv = require('dotenv').config();

module.exports = {

  TIPOPERSISTENCIA: process.env.TIPOPERSISTENCIA,
  CLUSTER: process.env.CLUSTER || 'SI'
}