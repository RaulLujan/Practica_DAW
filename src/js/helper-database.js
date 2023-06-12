const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = mysql.createConnection(
        {
            host: 'sql11.freemysqlhosting.net',
            user: 'sql11482284',
            password: 'p9tXHmaaM8',
            database: 'sql11482284'
        });
    return connection
}

async function registerContact(connection, name, mail, message) {
    let result = connection.execute('INSERT INTO `Contactos` SET `nombre` = ?, `mail` = ?, `mensaje` = ?', [name, mail, message]);
    return result
}

async function getAllContact(connection) {
    const [rows, fields] = await connection.execute('SELECT * FROM `Contactos`');
    return rows
}

exports.getConnection = getConnection
exports.registerContact = registerContact
exports.getAllContact = getAllContact