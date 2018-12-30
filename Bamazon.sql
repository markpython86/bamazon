DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price FLOAT(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation4", "Electronics", 400.34, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung TV LED", "Electronics", 1200.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell Laptop XPS 15", "Electronics", 2500.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Home and Garden", 1300, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Office Desk", "Home and Garden", 320, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Twin Bed", "Home and Garden", 450, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NordicTrack T 6.5 S Treadmill", "Sports and Outdoors", 750, 79);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Folding Exercise Bike", "Sports and Outdoors", 230, 49);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter Boxed Set: Books 1-7", "Books and Audible", 120, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Lord of the Rings", "Books and Audible", 25, 110);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Patio Furniture Set", "Home and Garden", 1250, 40);