var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

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
    if (err) {
        console.log('Error connecting to Db');
        throw err;
    }
});

// Prompt Manager for desire to continue or end connection to database
function promptManager() {
    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to continue?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                askManager();
            break;

            case 'No':
                connection.end();
            break;
        }
    });
}

// Select all information from products table to display for Manager, prompt manager for desire to continue
function viewProducts() {
    connection.query('SELECT * FROM products', function(err, results){        
        if (err) throw err;
        displayForManager(results);
        promptManager(); 
    })
}

//Select products from database whose quantity is less than 5 items and display in a table, prompt manager if desires to continue
function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err,results) {
        if (results == '') {
            console.log('\n There are no products with lower than 5 in the Inventory');
            promptManager();
        } else {
            // console.log(results)
            console.log('\n  All products with quantity lower than 5 shown in Inventory Table\n');
            displayForManager(results);
            promptManager();
        }         
    })
}

// Update the quantity of an item already in database, display updated value in a table
function addInventory() {

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product",
        validate: function (value) {
            var pass = value.match(
                /[1-9]/g
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid number';
        }

    }, {
        name: "quantity",
        type: "input",
        message: " Enter quantity you wish to add",
        validate: function (value) {
            var pass = value.match(
                /[1-9]/g
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid number';
        }

    }]).then(function(answer) {

        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.id},function(err,res) {
            
            console.log(res)
            itemQuantity = res[0].stock_quantity + parseInt(answer.quantity);

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: itemQuantity
            }, {
                item_id: answer.id
            }], function(err, results) {});

            connection.query('SELECT * FROM products WHERE ?', {item_id: answer.id},function(err,results) {
                console.log('\n The Stock Quantity was updated- see Inventory Table\n');   
                displayForManager(results);
                promptManager();
            });

        });
    });
}   

// Add a new product into the database with all of it's information, display the Inventory Table, prompt Manager if desires to continue
function addProduct() {
    inquirer.prompt([{
        name: "productName",
        type: "input",
        message: " Enter the name of the product",
    }, {
        name: "departmentName",
        type: "input",
        message: " Enter the department of the product",
    }, {
        name: "price",
        type: "input",
        message: " Enter price of the product",
    }, {
        name: "quantity",
        type: "input",
        message: " Enter the quantity",                
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.productName,
            department_name: answer.departmentName,
            price: answer.price,
            stock_quantity: answer.quantity
        }, function(err, res) {
            console.log('\n  The new product was added - See the Inventory Table\n');
                // connection.query('SELECT * FROM products', function(err, results){  
                //     displayForManager(results);
                //     promptManager();
                viewProducts();
                // });               
        }); 
    });
} 

function deleteProduct() {
        inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product you wish to delete",
        validate: function (value) {
            var pass = value.match(
                /[1-9]/g
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid number';
        }
    }]).then(function(answer) {

        connection.query("DELETE FROM products WHERE ?", {
            item_id: answer.id
        }, function(err, results) {
            console.log('\n  The product was deleted - See the Inventory Table\n');
            connection.query('SELECT * FROM products', function(err, results){  
                    displayForManager(results);
                    promptManager();
            });
        });
    });
}

// Give Manager choices for options to view or update database, give option to terminate, and check for valid choice
function askManager() {
    var managerMsg = [
    '\nSelect the option number for the option you need:\n',
    "1 - View Products for Sale\n", 
    "2 - View Low Inventory\n", 
    "3 - Add to Inventory\n", 
    "4 - Add New Product\n",
    "5 - Delete Product\n",
    "6 - All Done\n",
    ];

    for (i = 0; i < managerMsg.length; i++) {
    console.log(managerMsg[i]);
    }

    inquirer.prompt({
        name: "option",
        type: "input",
        message: " Which option would you like to choose?\n",
    }).then(function(answer) {

        var choice = parseInt(answer.option);

        if (choice > 0 && choice <= 6) {
            switch(answer.option) {
                case '1':
                     viewProducts();
                     break;
                
                case '2':
                     viewLowInventory();
                     break;
                
                case '3':
                     addInventory();
                     break;
                
                case '4':
                     addProduct();
                     break;

                case '5':
                     deleteProduct();
                     break;

                case '6':
                     connection.end();
                     break;       
            } 
        } else {
            console.log('Please choose a number between 1 and 6');
            askManager();
        }
    });
}

// Displays Inventory Table for Manager, Results from a SELECT query are passed in as parameter and used 
var displayForManager = function(results) {   
    var display = new displayTable();
    display.displayInventoryTable(results);
}

// **** Start the Bamazon Manager Function ****
askManager();
