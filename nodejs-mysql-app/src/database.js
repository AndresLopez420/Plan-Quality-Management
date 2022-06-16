const mysql = require ('mysql');
const {promisify} = require('util');
const {database} = require('./keys');
const Connection = require('mysql/lib/Connection');
const ConnectionConfig = require('mysql/lib/ConnectionConfig');
const Pool = require('mysql/lib/Pool');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_COLECCION_LOST') {
            console.error('Se cerro la conexion con la Base de Datos.')
        }
        if (err.code == 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones a la Base de Datos')
        }
        if (err.code == 'ECONNREFUSED') {
            console.error('La conexion con la Base de Datos fue Rechazada')
        }
    } 
    if(connection) connection.release();
    console.log('Base de Datos Conectada');
    return;
});
pool.query = promisify(pool.query);

module.exports = pool;