const mysql = require('mysql')

const dbConnectionPool = mysql.createPool({
    host            : '127.0.0.1',
    port: 3306,
    user            : 'root',
    password        : 'Emdad@5023',
    database        : 'quotedb',
    connectionLimit : 10
})

dbConnectionPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }
    
    if (connection) {
        console.log('DB Connection Established..')
        connection.release()
    }
    
})


module.exports = dbConnectionPool