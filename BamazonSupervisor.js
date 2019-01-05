var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var displayTableSuper = require('./SupervisorTableDisplay.js');

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
    promptSupervisor();
});

function promptSupervisor() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What activity would you like to perform?",
        choices: [
            'View Product Sales By Department',
            'Create New Department',
            'Exit'
        ],
        paginated: true
    }).then(function(answer) {
        switch(answer.action) {
            case 'View Product Sales By Department':
                viewSales();
                break;
            case 'Create New Department':
                addDepartment();
                break;
            case 'Exit':
                return connection.end();
        }
    });
}


var viewSales = function () {
    connection.query('SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.products_revenue) product_sales, SUM(p.products_revenue) - over_head_costs total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY department_id;', function(err, results){  
        if (err) throw err;      
        displayForSupervisor(results);
        promptSupervisor(); 
    });
}

// function viewSales() {

//     const deptArr = new Table({
//         head: ['Department Id', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
//         colWidths: [15, 40, 16, 16, 16],
//     });


//     const query = "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.products_revenue) product_sales, SUM(p.products_revenue) - over_head_costs total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY department_id;";

//     connection.query(query, {}, function (err, res) {
   
//         if (err) throw err;

//         if (res.length) {
//             res.forEach(prodDept => {

//                 if (!prodDept.sales) {
//                     prodDept.sales = parseFloat(0);
//                     prodDept.profit = parseFloat(prodDept.sales - prodDept.dept_overhead).toFixed(2);
//                 };
//                 // if (!prodDept.profit) {
//                 //     prodDept.profit = parseFloat(prodDept.product_sales - prodDept.dept_overhead).toFixed(2);
//                 // }
//                 prodDept.sales = parseFloat(prodDept.sales).toFixed(2);
//                 prodDept.profit = parseFloat(prodDept.profit).toFixed(2);
//                 deptArr.push(
//                     [
//                         prodDept.dept_id,
//                         prodDept.dept_name,
//                         prodDept.dept_overhead,
//                         prodDept.sales,
//                         prodDept.profit
//                     ])
//             });
//             console.log(deptArr);
//             promptSupervisor()
//         };
//     });
// };


var displayForSupervisor = function(results) {   
    var display = new displayTableSuper();
    display.displayDepartmentTable(results);
}

function addDepartment() {

    inquirer.prompt([{
        name: "departmentName",
        type: "prompt",
        message: "Enter Department Name:"
    },
    {
        name: "departmentOverhead",
        type: "prompt",
        message: "Enter Department Overhead Cost:",
    }]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answer.departmentName,
            over_head_costs: answer.departmentOverhead,
        }, function (err, res) {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.log(`Department ${answer.addDeptName} already exists. Please try again with a unique department name`)
                } else {
                    throw err;
                };
            } else {
                
                // expect one row to be added
                if (res.affectedRows === 1) {
                    console.log(`Your department has been added and assigned item id ${res.insertId}`)
                } else {
                    console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                }
            };
            // console.log('\n  The new department was added - See the Department Table\n');
            // connection.query('SELECT * FROM departments', function(err, results){  
            // displayForManager(results);
            promptSupervisor();
        });
    });
}