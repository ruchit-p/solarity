CREATE TABLE customer(
    customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address1 VARCHAR(50) NOT NULL,
    address2 VARCHAR(50) NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    username varchar(20) NOT NULL,
    password varchar(200) NOT NULL
);


CREATE TABLE category (
    category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoryname VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL
);


CREATE TABLE supplier(
    supplier_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    suppliername VARCHAR(50) NOT NULL,
    pointofcontact VARCHAR(50) NOT NULL,
    weburl VARCHAR(50) NOT NULL,
    suppliernotes VARCHAR(250)
);


CREATE TABLE product (
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productname VARCHAR(100) NOT NULL,
    prodimage VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    wattage INT NOT NULL,
    cell_efficiency DECIMAL NOT NULL,
    weight DECIMAL NOT NULL,
    power_tolerance INT NOT NULL,
    prodprice DECIMAL(8,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE ON UPDATE RESTRICT
);


CREATE TABLE saleorder (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    saledate DATE NOT NULL,
    customernotes VARCHAR(500),
    paymentstatus VARCHAR(10),
    authorizationnum VARCHAR(10),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT
);


CREATE TABLE transaction (
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    saleprice DECIMAL(8,2) NOT NULL,
    qty INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
);


CREATE TABLE review (
    review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    reviewdate DATE NOT NULL,
    comments VARCHAR(500),
    rating INT NOT NULL,
    status VARCHAR(10),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
);




INSERT INTO customer(firstname, lastname, email, phone, address1, address2, city, state, zip, username, password)
VALUES ("Ruchit", "Patel", "ruchitp1017@gmail.com", "1231231231", "123 Lime st.", "", "Chicago", "IL", "60101", "rpate", "pass123");

INSERT INTO category(categoryname, description) VALUES ("Residential Solar Panel", "Solar panels for residential buildings");

INSERT INTO supplier(suppliername, pointofcontact, weburl, suppliernotes) 
VALUES ("Dmsolar", "online", "https://www.dmsolar.com/", "Supplier is based in florida and provides solar cells, panels, systems, and attic ventilators.");

INSERT INTO product(productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity) 
VALUES ("DMSOLAR Solar Panel 300w", "dmsolar300wmodule.png", "Industry leading solar panel features a strong frame passing a mechanical load test of 2400Pa to withstand heavy snow load and higher wind pressure. 25 Year warrenty.", 
1, 1, '77"x38.98"x1.97"', 300, 17.44, 52.14, 3, 1080, "instock", 12);

