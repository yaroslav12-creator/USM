const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

function connect() {
    connection.connect(err => {
        if(err) throw err;
        console.log('Successfully connected!');
    });
}


module.exports = {
    connection,
    connect
}