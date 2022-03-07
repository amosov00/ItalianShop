const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mac',
  password: 'root',
  host: 'localhost',
  port: '5432',
  database: 'italy_market'
})

module.exports = pool