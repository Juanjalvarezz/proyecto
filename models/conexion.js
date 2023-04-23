require('dotenv').config()
var mysql      = require('mysql'); 
var connection = mysql.createConnection({ 
  host     : 'localhost',
  user     : process.env.dbUser,
  password : process.env.dbPass,
  database : process.env.dbName
});
 
connection.connect();
 
module.exports = connection
