// Displays Inventory Table for Manager, response from a SELECT query are passed in as parameter and used 

Table = require('cli-table');
var displayTable = function () {

	this.table = new Table({
		head: ['Item ID', 'Product Name', 'Category', 'Price', 'Stock Qty', 'Items Sold', 'Revenues'],
		// colWidths: ['15','40','25','25','25','25','25']
	});

	this.displayInventoryTable = function (response) {
		this.response = response;

		for (var index = 0; index < this.response.length; index++) {
			if (!this.response[index].products_sold) {
                	this.response[index].products_sold = parseFloat(0);
                	this.response[index].products_revenue = parseFloat(0);
                };

			this.table.push(
				[this.response[index].item_id,
				this.response[index].product_name,
				this.response[index].department_name,
				'$' + this.response[index].price,
				this.response[index].stock_quantity,
				this.response[index].products_sold,
				'$' + this.response[index].products_revenue]);
		}
		console.log('\n' + this.table);
	};
}
module.exports = displayTable;