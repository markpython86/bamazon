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

connection.connect(function (err) {
    if (err) throw err;
    // Start app by Prompting the customer
    customerPrompt();
});

var displayProducts = function () {
    var display = new displayTable();
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        display.displayInventoryTable(response);
        connection.end();
    });
}

var customerPrompt = function () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would like to continue shopping?\n",
        choices: ["Yes", "No"]
    }).then(function (answer) {
        switch (answer.action) {
            case 'Yes':
                displayProducts();
                break;
            case 'No':
                connection.end();
                break;
            default:
                break;
        }
    })
};





