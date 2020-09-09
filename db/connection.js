// create connection to the sql server
// import mysql and util (use util to promisify the connection queries)
'use strict';

const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db'
});

connection.connect(function (err) {
    // check connection
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
    
    //check during install
     //console.log("connected as id " + connection.threadId);
});

// promisify my queries
connection.query = util.promisify(connection.query);

module.exports = connection;