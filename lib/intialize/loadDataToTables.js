/**
 * Created by XiTU on 1/27/14.
 */

var fs=require('fs');
var readline=require('readline');
var constants = require('./../common/constants');
//var assert = require('assert');
var dbPool = require('./../dbOperation/createDBConnectionPool');
var stringUtils = require('./../utilities/stringUtils');
var tableNames = require('./../common/tableNames');


//connection.query('CREATE database sctravel');
//connection.query('USE sctravel');


/**********************************************
 *
 * Read data from txt files
 *  according to the format given by params
 * Load the data read from file to
 *  our @tableName table in our DB
 *
 * @param tableColumnNames
 * @param tableColumnTypes
 * @param filePath
 * @param delimiter
 * @param tableName
 *
 *********************************************/
var loadDataFromTxtToTable = function( tableColumnNames, tableColumnTypes, filePath, delimiter, tableName) {

    var connection = dbPool.connection;
    //check the length of tableColumnNames and table ColumnTypes
    if(tableColumnNames.length != tableColumnTypes.length) {
        throw new Error("The length for " + tableName + " of tableColumnNames is "+ tableColumnNames.length+"; and the length of " +
   " tableColumnTypes is "+ tableColumnTypes.length+". They should be equal!");
    }


    console.log("splitting line by "+delimiter);

    var rd = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });


    var processline = function(line) {

        var userInput = line.split(delimiter);

        //Convert the types from String to Number if necessary
        for(var i in tableColumnTypes) {

   var type = tableColumnTypes[i];
   if(type==constants.TYPE_NUMBER) {
       userInput[i] = Number(userInput[i]);
   } else if(type==constants.TYPE_STRING) {
       if(userInput[i]) {
  userInput[i]=userInput[i].trim();
       }
   } else if(type==constants.TYPE_DATE) {
       if(!userInput[i] || userInput[i]=='') {
  userInput[i]=null;
       }
   }
        }

        //console.log(userInput);
        var insertSql = 'Insert into ' + tableName +
   ' ( ' + stringUtils.getDelimitedStringFromArray(tableColumnNames,',') +' ) VALUES ( ' +
  stringUtils.getDelimitedRepeatString('?',',',tableColumnNames.length) + ' ) ' ;
        //console.log(insertSql);
        //we can get the automated insertId here in the results
        connection.query( insertSql, userInput,function(err,results){
   //console.dir(results)
        });
    }

    rd.on('line', function(line) {
        processline(line);
        console.log(line);
    });

    rd.on('close',function(){
       // connection.end();
    })


}


/***********************
 *
 * Loading data from txt
 *  file to our DB
 *
 * @type {string}
 **********************/
var parentProductFilePath = '../data/parentProduct.dat';
var parentProductColumnNames=['parent_product_type','parent_product_name','subTitle',  
'description','rating','max_price', 'min_price', 'is_active', 'customer_group', 'product_class',      
'duration',  'keywords',  'airline',   'flightNo',  'departure', 'arrival'];
var parentProductColumnTypes=['STRING','STRING','STRING',
'STRING','NUMBER','NUMBER','NUMBER','STRING','STRING', 'STRING'
'NUMBER', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING'];

loadDataFromTxtToTable(parentProductColumnNames,parentProductColumnTypes,parentProductFilePath,',', tableNames.parentProductTable);


var productsFilePath = '../data/products.dat';
var productsColumnNames=['parent_product_id','product_type','product_name','subTitle','description',
'list_price','is_active','customer_group','product_class','duration',
'keywords','airline','flightNo','departure','arrival'];

var productsColumnTypes=['NUMBER',   'STRING',  'STRING',  'STRING', 'STRING', 
'NUMBER',  'STRING',  'STRING', 'STRING', 'NUMBER',  
'STRING','STRING', 'STRING',   'STRING','STRING'];

loadDataFromTxtToTable(productsColumnNames,productsColumnTypes,productsFilePath,',', tableNames.productsTable);


var currentProductDailyPriceInventoryFilePath = '../data/currentProductDailyPriceInventory.dat';
var currentProductDailyPriceInventoryColumnNames= ['product_id','date','price','quantity_available'];
var currentProductDailyPriceInventoryColumnTypes= ['NUMBER','STRING','NUMBER','NUMBER'];
//load data to currentProductDailyPriceInventoryTable
loadDataFromTxtToTable(currentProductDailyPriceInventoryColumnNames,currentProductDailyPriceInventoryColumnTypes,
	currentProductDailyPriceInventoryFilePath,',', tableNames.currentProductDailyPriceInventoryTable);

var customerFilePath = '../data/customer.dat';
var customerColumnNames = ['username','password','first_name','middle_name','last_name',
'phone','email','address','city','state',
'country','post_code','is_active'];
var customerColumnTypes = ['STRING','STRING','STRING','STRING','STRING',
'STRING','STRING','STRING','STRING','STRING',
'STRING','STRING','STRING'];
//load data to customer
loadDataFromTxtToTable(customerColumnNames,customerColumnTypes,customerFilePath,',',tableNames.customerTable);

//rd.close();
//name, type, content, image, web_url, latitude, longtitude, city, address, phone, hours



