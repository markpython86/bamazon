DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price FLOAT(10,2) NULL,
    stock_quantity INT NULL,
    products_sold INT NULL,
    products_revenue FLOAT(10,2) NULL,
    PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
VALUES ("PlayStation4", "Electronics", 400.34, 10, 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Samsung TV LED", "Electronics", 1200.25, 20, 20, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Dell Laptop XPS 15", "Electronics", 2500.99, 24, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Sofa", "Home and Garden", 1300, 40, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Office Desk", "Home and Garden", 320, 120, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Twin Bed", "Home and Garden", 450, 24, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("T 6.5 S Treadmill", "Sports and Outdoors", 750, 80, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Folding Exercise Bike", "Sports and Outdoors", 230, 49, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Harry Potter Books 1-7", "Books and Audible", 120, 50, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("The Lord of the Rings", "Books and Audible", 25, 110, 0, 0);

 INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold, products_revenue)
 VALUES ("Patio Furniture Set", "Home and Garden", 1250, 40, 0, 0);
 
 
 
 CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NULL,
    over_head_costs FLOAT(10,2) NULL,
    product_sales FLOAT(10,2) NULL,
    -- total_profit FLOAT(10,2) NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
Values ("Electronics", 67600);
 
 INSERT INTO departments (department_name, over_head_costs)

VALUES ("Books and Audible", 6650);
        
INSERT INTO departments (department_name, over_head_costs)

values ("Sports and Outdoors", 65800);

 
 
-- SELECT departments.department_name department_name,  
-- over_head_costs, sum(products.products_revenue) AS product_sales,
-- sum(products.products_revenue) - over_head_costs AS total_profit
-- FROM departments 
-- LEFT JOIN products 
-- ON departments.department_name=products.department_name AND departments.product_sales = products.products_revenue
-- -- ON departments.product_sales = products.products.products_revenue
-- GROUP BY departments.department_name;


SELECT d.department_id,
    d.department_name,
    d.over_head_costs,
    SUM(p.products_revenue) as product_sales,
    SUM(p.products_revenue) - over_head_costs as total_profit
    
FROM departments d
LEFT JOIN products p
ON d.department_name = p.department_name
GROUP BY department_id;



-- SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.products_revenue) product_sales, SUM(p.products_revenue) - over_head_costs total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY department_id;