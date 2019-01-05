Table = require('cli-table');
var displayTableSuper = function () {

	this.table = new Table({
		head: ['Department Id', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
	});

	this.displayDepartmentTable = function (response) {
		this.response = response;


		for (var index = 0; index < this.response.length; index++) {
             if (!this.response[index].product_sales) {
                   this.response[index].product_sales = parseFloat(0);
                    this.response[index].total_profit = parseFloat(this.response[index].product_sales - this.response[index].over_head_costs).toFixed(2);
                };
                this.response[index].product_sales = parseFloat(response[index].product_sales).toFixed(2);
                this.response[index].total_profit = parseFloat(response[index].total_profit).toFixed(2);
			this.table.push(
				[this.response[index].department_id,
				this.response[index].department_name,
				// this.response[index].department_name,
				'$' + this.response[index].over_head_costs,
				'$' + this.response[index].product_sales,
				'$' + this.response[index].total_profit]);
		}
		console.log('\n' + this.table);
	};
}
module.exports = displayTableSuper;

