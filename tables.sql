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
    homepage boolean NULL
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
VALUES ("Rocky", "Patel", "rockyp@gmail.com", "1231233231", "123 Lime st.", "", "Chicago", "IL", "60101", "rockyp", "pass1234"), ("James", "Gordon", "jamesg@gmail.com", "3453453432", "321 Lime st.", "", "Orlando", "FL", "34892", "jamesg", "pass1234"),
("James", "Smith", "jamess@gmail.com", "3453453453", "34 Tree st.", "", "Chicago", "IL", "60101", "jamess", "pass1234"), ("Kevin", "Hart", "khart@gmail.com", "4564564564", "4324 Hart St.", "", "Chicago", "IL", "60101", "khart", "pass1234");

INSERT INTO category(categoryname, description) VALUES ("Industrial Solar Panel", "Solar panels for Industrial buildings"), ("Solar Lights", "Solar lights for residential and commercial use"), ("Solar Water Heater", "Solar water heater for residential and commercial use"), ("Solar Pool Heaters", "Solar pool heaters for residential use");

INSERT INTO supplier(suppliername, pointofcontact, weburl, suppliernotes) 
VALUES ("Dmsolar", "online", "https://www.dmsolar.com/", "Supplier is based in florida and provides solar cells, panels, systems, and attic ventilators."), ("Solar Energy", "online", "https://www.solarenergy.com/", "Supplier is based in florida and provides solar panels for industrial use."),
("Tron Energy", "online", "https://www.tronenergy.com/", "Supplier is based in Texas and provides solar pool heaters and water heaters."), ("Crest Energy", "online", "https://www.crestenergy.com/", "Supplier is based in Japan and provides solar lights and panels at an affordable price.");

INSERT INTO product(productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity) 
VALUES ("DMSOLAR Solar Panel 300w", "dmsolar300wmodule.png", "Industry leading solar panel features a strong frame passing a mechanical load test of 2400Pa to withstand heavy snow load and higher wind pressure. 25 Year warrenty.", 
1, 1, '77"x38.98"x1.97"', 300, 17.44, 52.14, 3, 1080, "instock", 12), ("DMSOLAR Solar Panel 400w", "dmsolar400wmodule.png", "Industry leading solar panel features a strong frame passing a mechanical load test of 2400Pa to withstand heavy snow load and higher wind pressure. 25 Year warrenty.",1, 5, '77"x38.98"x1.97"', 300, 17.44, 52.14, 3, 1080, "Out of Stock", 0), 
("Tron Solar Pool Heater 200w", "tron200wpoolheater.png", "Industry leading solar pool heater features a effective and compact heater that works day and night to keep your pool warm. 25 Year warrenty.", 3, 3, '15"x23.98"x1.97"', 200, 17.44, 52.14, 3, 370, "Available", 2), 
("Tron Solar Pool Heater 300w", "tron300wpoolheater.png", "Industry leading solar pool heater features a effective and compact heater that works day and night to keep your pool warm. 25 Year warrenty.", 3, 3, '15"x23.98"x1.97"', 300, 17.44, 52.14, 3, 400, "Available", 1), 
("Tron Solar Pool Heater 400w", "tron400wpoolheater.png", "Industry leading solar pool heater features a effective and compact heater that works day and night to keep your pool warm. 25 Year warrenty.", 3, 3, '15"x23.98"x1.97"', 400, 17.44, 52.14, 3, 470, "Available", 6), 
("Crest Solar Lights 200w", "crest200wlights.png", "Industry leading solar lights features a bright led light that can last 1 months without sunlight. 25 Year warrenty.", 2, 4, '17"x48.98"x1.97"', 200, 17.44, 52.14, 3, 320, "Available", 2), 
("Crest Solar Lights 300w", "crest300wlights.png", "Industry leading solar lights features a bright led light that can last 1 months without sunlight. 25 Year warrenty.", 2, 4, '17"x48.98"x1.97"', 300, 17.44, 52.14, 3, 400, "Available", 2);

INSERT INTO saleorder(customer_id, saledate, customernotes, paymentstatus, authorizationnum) VALUES (1, "2022-01-01", "", "Recieved", "12346"), (2, "2022-04-25", "", "Pending", "12347"), (3, "2019-01-01", "", "Recieved", "12348"), 
(5, "2021-04-01", "", "Pending", "12343"), (1, "2022-02-01", "", "Recieved", "12349");

INSERT INTO transaction(order_id, product_id, saleprice, qty) VALUES (1, 1, 1080, 2), (2, 10, 232, 1), (3, 3, 370, 4), (4, 4, 400, 3), (5, 5, 300, 1);

INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, status) VALUES (1, 1, "2019-01-01", "This is a great product", 5, "Posted"), (2, 1, "2019-01-01", "This is a Ok product", 3, "Draft"), 
(3, 3, "2019-01-01", "This is a great product", 5, "approved"), (4, 5, "2019-01-01", "This is a bad product", 2, "Posted"), (5, 10, "2019-01-01", "This is a bad product", 2, "Draft"), (1, 8, "2019-01-01", "This is a phenomenal product", 5, "Posted");