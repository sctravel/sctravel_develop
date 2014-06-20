/**
 * Created by XiTU on 5/29/14.
 */

// declare and define all the variables used in the module
var constants = require('./../common/constants');
var tableNames = require('./../common/tableNames');
var dbPool = require('./createDBConnectionPool');
var cache = require('memory-cache');
var stringUtils = require('./../utilities/stringUtils');
var runQuery = dbPool.runQuery;
var runQueryWithParams = dbPool.runQueryWithParams;


var timeoutInMilliSeconds = 1000*60*60*24;  //Cache timeout in 1 day


/****************************************************
 * Common utility for getAll functions
 * return all the requested data in json format.
 * Searching in Cache first, with key @tableName
 *  if key doesn't exist, query from DB, and
 *   then put the key/value pair into Cache
 * @param tableName
 *     the table name which we need to extract from
 * @param callback
 *     callback function to process the results
 ****************************************************/
function getAllFromCacheOrDB(tableName,cacheKey,whereClause,keyName,callback) {
    var data = cache.get(cacheKey);
    //First get the data from cache,
    //if there's no data in cache, query from DB and then put it into cache.
    if(data) {
        console.info("Cache hits, getting " +cacheKey+ " from Cache.");
        callback(data);
    } else {
        loadDataFromDBToCache(tableName,cacheKey,whereClause,keyName,callback);
    }
}

function loadDataFromDBToCache(tableName,cacheKey,whereClause,keyName,callback) {
    var sql = " select * from "+tableName+" "+whereClause;
    runQuery(sql,function(err,results){
        if(err) {
            throw err;
        }
        var allData={};
        //format the results with search key "keyName"
        for(var i in results) {
            var result=results[i];
            //console.log(result);
            allData[result[keyName]]=result;
        }
        console.log("Cache missing, querying "+cacheKey+" from DB.");
        cache.put(cacheKey,allData,timeoutInMilliSeconds);
        callback(allData);
    });
}
exports.loadDataFromDBToCache = loadDataFromDBToCache;


//////////////////////////////////////////////
// Search Functions
//////////////////////////////////////////////
function buildKeywordsSearchString(keywordArray) {
    if(!keywordArray || keywordArray.length==0) return "";

    var search = " and (";

    for(var i in keywordArray) {
        var keyword = keywordArray[i];
        search += " keywords like '%"+keyword+"%' "
        if(i<keywordArray.length-1) search+=" or ";
    }

    search += " ) ";
    console.info("Keywords Search String : "+search);
    return search;
}
/***
 *
 * @param keywords  whitespace or comma separated key words
 */
exports.searchVacationPackagesByKeyWords = function(keywords,callback) {

    console.info("Searching vacation packages with keywords : "+keywords);
    var keywordArray =keywords.trim().split(/[\s,]+/);

    var sql = " select  parent_product_id, parent_product_name,subTitle,description,rating, " +
        " max_price,min_price,customer_group,product_class,duration, departure, arrival " +
        "  from " + tableNames.parentProductTable +
        " where parent_product_type= "+constants.PRODUCT_TYPES.PACKAGE + " and is_active='Y' "+buildKeywordsSearchString(keywordArray);

    runQuery(sql,function(err,results){
        if(err) {
            callback(err,null);
            return;
        }
        console.dir(results);
        callback(null,results);
    })

}


exports.searchChildrenProducts = function(parent_product_id,callback) {

    console.info("load children products : "+parent_product_id);

    var sql = " select product_id, product_name,subTitle,description, " +
        " list_price,customer_group,product_class,duration, keywords, airline, flightNo, departure, arrival " +
        "  from " + tableNames.productsTable +
        " where parent_product_id= "+parent_product_id + " and is_active='Y'";

    console.dir(sql);

    runQuery(sql,function(err,results){
        if(err) {
            callback(err,null);
            return;
        }
        console.dir(results);
        callback(null,results);
    })


}

