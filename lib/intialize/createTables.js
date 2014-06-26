var dbPool = require('./../dbOperation/createDBConnectionPool');
var tableNames = require('./../common/tableNames');
var constants = require('./../common/constants');
var connection = dbPool.connection;
//var runQuery = dbPool.runQuery;
//var runQueryWithParams = dbPool.runQueryWithParams;


var callback = function(results) {
    console.log(results);
}


var errorHandler = function(err) {
    if (err != null)
        console.log(err);
}

//connection.query('CREATE database sctravel',errorHandler);
//connection.query('USE sctravel');
//connection.query('DROP TABLE t_tickets_sold',errorHandler);
//connection.query('DROP TABLE t_tickets_inventory',errorHandler);
//connection.query('DROP TABLE t_orders',errorHandler);
//connection.query('DROP TABLE t_scenery_spots',errorHandler);

connection.connect();

var dropTableSQLs=[];

var dropTableSQL0='DROP TABLE '+ tableNames.customerTable;
var dropTableSQL1='DROP TABLE '+ tableNames.customerLoginHistoryTable;
var dropTableSQL2='DROP TABLE '+ tableNames.productsTable;
var dropTableSQL3='DROP TABLE '+ tableNames.ordersTable;
var dropTableSQL4='DROP TABLE '+ tableNames.orderDetailTable;
var dropTableSQL5='DROP TABLE '+ tableNames.currentProductDailyPriceInventoryTable;
var dropTableSQL6='DROP TABLE '+ tableNames.parentProductTable;


dropTableSQLs.push(dropTableSQL5);
dropTableSQLs.push(dropTableSQL4);
dropTableSQLs.push(dropTableSQL3);
dropTableSQLs.push(dropTableSQL2);
dropTableSQLs.push(dropTableSQL1);
dropTableSQLs.push(dropTableSQL0);
dropTableSQLs.push(dropTableSQL6);


var createTableSQL0 = 'CREATE TABLE ' + tableNames.customerTable +
    ' ( customer_id INT PRIMARY KEY AUTO_INCREMENT, ' +
    ' username VARCHAR(20) NOT NULL, ' +
    ' password VARCHAR(63) NOT NULL, ' +
    ' first_name VARCHAR(20) NOT NULL, ' +
    ' middle_name VARCHAR(20) , ' +
    ' last_name VARCHAR(20) NOT NULL, ' +
    ' phone VARCHAR(15) , ' +
    ' email VARCHAR(255) NOT NULL, ' +
    ' address VARCHAR(255) , ' +
    ' city VARCHAR(63) , ' +
    ' state VARCHAR(15), ' +
    ' country VARCHAR(20), ' +
    ' post_code VARCHAR(15), ' +
    ' is_active ENUM(\'Y\', \'N\') DEFAULT \'Y\' ,' +
    ' creation_datetime TIMESTAMP default now(), ' +
    ' last_updated_by VARCHAR(15) default \'sysuser\', ' +
    ' last_updated_time TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, ' +
    ' UNIQUE(customer_id), UNIQUE(username) ' +  //LOGIN and PASSWORD?
    ' )ENGINE=InnoDB  AUTO_INCREMENT=1000001 DEFAULT CHARSET=utf8 ';

var createTableSQL1 = ' CREATE TABLE ' + tableNames.customerLoginHistoryTable +
    ' ( history_id INT PRIMARY KEY AUTO_INCREMENT, ' +
    '   customer_id INT NOT NULL ,' +
    '   login_datetime DATETIME  DEFAULT now(), ' +
    '   logout_datetime DATETIME , ' +
    '   random_key VARCHAR(6) NOT NULL, ' + //randomKey is used for identifier of this login activity
    '   FOREIGN KEY login_history_f_key_customer_id (customer_id) REFERENCES '+tableNames.customerTable+' (customer_id) ON DELETE CASCADE ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';


var createTableSQL2 = ' CREATE TABLE ' + tableNames.parentProductTable +
    ' ( parent_product_id INT PRIMARY KEY AUTO_INCREMENT, ' +
    '   parent_product_type VARCHAR(15) ,' +
    '   parent_product_name VARCHAR(100), ' +
    '   subTitle VARCHAR(50) , ' +
    '   description VARCHAR(500), ' +
    '   rating DECIMAL(2,1), ' +
	'   max_price DECIMAL(20,6), ' +
	'   min_price DECIMAL(20,6), ' +
	'   is_active ENUM(\'Y\', \'N\') DEFAULT \'Y\', ' +
    '   is_on_homepage ENUM(\'Y\', \'N\') DEFAULT \'N\', ' +
    '   customer_group VARCHAR(20), ' +
	'   product_class VARCHAR(20), ' +
	'   duration INT, ' +
	'   keywords VARCHAR(500), ' +
	'   airline VARCHAR(100), ' +
	'   flightNo VARCHAR(100), ' +
	'   departure VARCHAR(10), ' +
	'   arrival VARCHAR(10) ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';
	
	
var createTableSQL3 = ' CREATE TABLE ' + tableNames.productsTable +
    ' ( product_id INT PRIMARY KEY AUTO_INCREMENT, ' +
    '   parent_product_id INT ,' +
    '   product_type VARCHAR(15) ,' +
    '   product_name VARCHAR(100), ' +
    '   subTitle VARCHAR(50) , ' +
    '   description VARCHAR(500), ' +
	'   list_price DECIMAL(20,6), ' +
	'   is_active ENUM(\'Y\', \'N\') DEFAULT \'Y\', ' +
	'   customer_group VARCHAR(20), ' +
	'   product_class VARCHAR(20), ' +
	'   duration INT, ' +
	'   keywords VARCHAR(500), ' +
	'   airline VARCHAR(100), ' +
	'   flightNo VARCHAR(100), ' +
	'   departure VARCHAR(10), ' +
	'   arrival VARCHAR(10), ' +
    '   FOREIGN KEY product_parent_id_f_key_id (parent_product_id) REFERENCES '+tableNames.parentProductTable+' (parent_product_id) ON DELETE RESTRICT ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';
	
	
var createTableSQL4 = ' CREATE TABLE ' + tableNames.ordersTable +
    ' ( order_id VARCHAR(18) PRIMARY KEY, ' +
    '   order_dateTime DATETIME ,' +
    '   customer_id INT, ' +
    '   customer_name VARCHAR(50) , ' +
    '   email VARCHAR(10000), ' +
	'   phone VARCHAR(20), ' +
	'   total_price DECIMAL(20,6), ' +
	'   order_status ENUM(\'booked\',\'paid\',\'cancelled\',\'unmatched\') DEFAULT \'booked\', ' +
	'   transaction_info VARCHAR(500), ' +
	'   confirmation_code VARCHAR(500), ' +
	'   total_order_amount DECIMAL(20,6), ' +
	'   paymentType VARCHAR(500), ' +
	'   shipAddress VARCHAR(500), ' +
	'   FOREIGN KEY orders_customer_f_key_id (customer_id) REFERENCES '+tableNames.customerTable+' (customer_id) ON DELETE RESTRICT ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';
	

	
var createTableSQL5 = ' CREATE TABLE ' + tableNames.orderDetailTable +
    ' ( order_detail_id VARCHAR(19) PRIMARY KEY, ' +
    '   order_id VARCHAR(18) ,' +
    '   product_id INT , ' +
    '   product_name VARCHAR(50) , ' +
    '   quantity INT, ' +
	'   start_date DATE, ' +
	'   end_date DATE, ' +
	'   subtotal_amount DECIMAL(20,6), ' +
	'   description VARCHAR(1000), ' +
	'   FOREIGN KEY orderdetail_order_id_f_key_id (order_id) REFERENCES '+tableNames.ordersTable+' (order_id) ON DELETE RESTRICT, ' +
	'   FOREIGN KEY orderdetail_product_id_f_key_id (product_id) REFERENCES '+tableNames.productsTable+' (product_id) ON DELETE RESTRICT ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';
	
	
var createTableSQL6 = ' CREATE TABLE ' + tableNames.currentProductDailyPriceInventoryTable +
    ' ( current_product_daily_price_id INT PRIMARY KEY AUTO_INCREMENT, ' +
    '   product_id INT , ' +
	'   date DATETIME, ' +
    '   price DECIMAL(20,6) , ' +
    '   quantity_available INT, ' +
	'   FOREIGN KEY orderdetail_product_id_f_key_id (product_id) REFERENCES '+tableNames.productsTable+' (product_id) ON DELETE RESTRICT ' +
    '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ';


var createTableSQLs=[];
createTableSQLs.push(createTableSQL0);
createTableSQLs.push(createTableSQL1);
createTableSQLs.push(createTableSQL2);
createTableSQLs.push(createTableSQL3);
createTableSQLs.push(createTableSQL4);
createTableSQLs.push(createTableSQL5);
createTableSQLs.push(createTableSQL6);


console.log("Drop tables ...");
//Drop tables first
for(var i in dropTableSQLs) {
   // console.log(dropTableSQLs[i]);
    connection.query(dropTableSQLs[i],errorHandler);
}

console.log("Create tables ...");
//Create tables
for(var i in createTableSQLs) {
   // console.log(dropTableSQLs[i]);
    connection.query(createTableSQLs[i],errorHandler);
}




/*
//Create triggers, used for disable cascade
//e.g. we disable a spot, any route related to the spot should be disabled automatically
//     we disable a route, any offer related to the route should be disabled automatically
connection.query('drop trigger disable_offer_after_routes', errorHandler);
connection.query('drop trigger disable_offer_after_routes', errorHandler);
;
connection.query( ' DELIMITER $$  CREATE TRIGGER DISABLE_ROUTES_AFTER_SPOT AFTER UPDATE ' +
 ' ON ' + tableNames.spotTable +
 ' FOR EACH ROW BEGIN ' +
 '   IF NEW.is_active=\'N\' THEN ' +
 '      SET @spotId = NEW.spot_id; ' +
 '      UPDATE SC_SKU_ROUTES SET IS_ACTIVE=\'N\' WHERE arrival_spot_id=@spotId; ' +
 '   END IF; ' +
 ' END$$ DELIMITER ;',errorHandler);


connection.query( ' DELIMITER $$  CREATE TRIGGER disable_offer_after_routes AFTER UPDATE ' +
 ' ON '+ tableNames.routeTable +
 ' FOR EACH ROW BEGIN ' +
 ' DECLARE done INT DEFAULT FALSE; '+
 ' DECLARE ids INT; '+
 ' DECLARE cur CURSOR FOR SELECT distinct OFFER_ID FROM sc_sku_offer_mapping where sku_id=NEW.ROUTE_ID; ' +
 ' DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; ' +
 ' IF NEW.is_active=\'N\' THEN ' +
 '   OPEN cur; '+
 '   ins_loop: LOOP ' +
 '      FETCH cur INTO ids; '+
 '      IF done THEN ' +
 '        LEAVE ins_loop; ' +
 '      END IF ; ' +
 '       UPDATE SC_OFFERS SET is_active = \'N\'  WHERE offer_id =ids; ' +
 '   END LOOP; ' +
 '   CLOSE cur; ' +
 ' END IF; ' +
 ' END; $$ DELIMITER ;' , errorHandler);
*/
connection.end();


//connection.query('CREATE database sctravel',errorHandler);
//connection.query('USE sctravel');

//connection.query('DROP TABLE SC_SKUS',errorHandler);
//connection.query('DROP TABLE SC_SKU_TICKETS',errorHandler);
//connection.query('DROP TABLE SC_SKU_ROUTES',errorHandler);
//connection.query('DROP TABLE SC_SCENERY_SPOTS',errorHandler);


//connection.query('CREATE UNIQUE INDEX t_orders_IDX_0 on t_orders(confirmation_code)',errorHandler);