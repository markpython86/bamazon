# Application

## bamazon

## Description

This is a node application to:
* view and maintain product and department information
* view and maintain product and department information
* allow customer to place orders for products

## Getting Started

### Prerequsites

1. Node.js must be installed (https://nodejs.org/en/download/)
1. MySQL must be installed. At a minimum, the free Community Edition must be present (https://www.mysql.com/downloads/) 
1. A MySQL developer tool such as MySQL Workbench or Sequel Pro (https://dev.mysql.com/downloads/workbench/) is needed to create and seed the database

### Installation

1. Clone repository bamazon using the code -> _git clone https://github.com/markpython86/bamazon.git bamazon_
1. Open a terminal session for the directory where the application was cloned to
1. run *npm install* to install the dependencies
1. Use the *bamazaon.sql* file to create the databases in MySQL

## Using the Application

There are 3 js files that can be run from a terminal session. Details on executing each of these is found in sections below.

1. `node BamazonCustomer.js`
    1. Purchase items and create an order
1. `node BamazonManager.js`
    1. View products
    1. View products with low inventory
    1. Add Inventory to a Product
    1. Add a Product
    1. Delete Product
1. `node BamazonSupevisor.js`
    1. View Product sales by Department
    1. Add a Department

### General Instructions

1. You must be in a terminal session for the directory that contains the application
1. Use the up/down arrow keys to navigate thru options and lists
1. Select an option or list item by pressing Enter or Return
1. The options and lists generally have an _Exit_ item that can be selected to exit the application
1. Ctrl+c _for windows_ or Command+c _for Mac_ can be used to exit the application at any time

### bamazonCustomer.js

1. run _node bamazonCustomer.js_ from a terminal session in the application directory
1. A list of products is presented
1. Select a product id to order
1. Once a product is selected, reply to the prompt with the quantity to order
1. A reply is provided indicating if the order is created or if there is not enough inventory
1. Reply to the prompt to continue with another order or to exit the application
![Demo](/images/Customer.gif)

### bamazonManager.js

1. run _node bamazonManager.js_ from a terminal session in the application directory
1. Six options are presented
1. **View products**
    1. A list of all products and details is presented
1. **View products with low inventory**
    1. Reply to the prompt with a quantity value
    1. A list is presented of all products with a stock quantity less than the quantity requested
1. **Add Inventory to a Product**
    1. Rely to the prompts to provide a product item number and the additional inventory
    1. The product item number must exist
1. **Add a Product**
    1. Rely to the prompts with the requested product information
    1. A product item number is automatically generated
    1. Product name must be unique
1. **Delete a product**
    1. Rely to the prompts with the requested
    1. Pick the item ID that want to be deleted
    1. Table will be displayed after update
1. **Exit**
    1. Terminate the Program

**View products**

![Demo](/images/Manager-View.gif)

**View products with low inventory**

![Demo](/images/Manager-View-Low.gif)

**Add Inventory to a Product**

![Demo](/images/Manager-Add-Inventory.gif)

**Add a Product**

![Demo](/images/Manager-Add-Product.gif)

**Delete a product**
![Demo](/images/Manager-Delete-Product.gif)

**Exit**
![Demo](/images/Manager-Exit.gif)


### bamazonSupervisor.js

1. run _node bamazonSupevisor.js_ from a terminal session in the application directory
1. Two options are presented
1. **View Product sales by Department**
    1. A list of product sales and profits for each department is presented
1. **Add a Department**
    1. Rely to the prompts with the requested department information
    1. A department item number is automatically generated
    1. Department name must be unique

 **View Product sales by Department**
 **Add a Department**
![Demo](/images/Supervisor-All.gif)


## Technical Information


### Database
1. MySQL is used as the database
2. Details for the database, tables and users can be found in the *.sql files

### Packages
1. cli-table    provides formatting to display list data in a table (https://www.npmjs.com/package/cli-table)
1. inquirer     provides framework for user prompts (https://www.npmjs.com/package/inquirer)
1. mysql        provides connection to MySQL database (https://www.npmjs.com/package/node-mysql)