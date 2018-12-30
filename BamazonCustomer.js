var mysql = require("mysql");
var inquirer = require('inquirer');
// var Table = require('cli-table');
var displayTable = require('./TableDisplay.js');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

var displayProducts = function() {
	var display = new displayTable();
	connection.query('SELECT * FROM products', function(err, response){
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
		display.displayInventoryTable(response);
        connection.end();
	});
}



