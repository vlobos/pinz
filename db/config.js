const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot1",
  database: "pinz"
});

dbConnection.connect((err)=>{
  if(err) throw err;
  console.log("Connected to database")
});

module.exports = dbConnection;