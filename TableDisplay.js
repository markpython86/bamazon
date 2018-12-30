// Displays Inventory Table for Manager, response from a SELECT query are passed in as parameter and used 

Table = require('cli-table');
var displayTable = function() {

    this.table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity'],
    });

    this.displayInventoryTable = function(response) {
    	this.response = response;
        
	    for (var index=0; index <this.response.length; index++) {
	        this.table.push(
	            [this.response[index].item_id, this.response[index].product_name, '$'+ this.response[index].price, this.response[index].stock_quantity] );
	    }
    	console.log('\n' + this.table);
	};
}
module.exports = displayTable;