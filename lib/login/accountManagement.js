/**
 * Created by XiTU on 4/27/14.
 *
 * All the operations in this file can only be done by super user
 * We check the username and randomKey to verify the user identity
 *   for each operation
 *
 */



var tableNames = require('./../common/tableNames');
var stringUtil = require('./../utilities/stringUtils');
var dbPool = require('./../dbOperation/createDBConnectionPool');
var constants = require('./../common/constants');
var verifyUser = require('./userLogin').verifyUser;


exports.getAllUsers = function(username, randomKey, callback) {

    verifyUser(username, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return
        }

        if(results && results == "done") {
            var getAllAdmins = " select username, name from " + tableNames.userLoginTable ;

            dbPool.runQuery(getAllAdmins, function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,results);
            })
        } else {
            calback(new Error("unknown error in getAllAdminUsers"),null);
        }

    })

}


/*
exports.deleteAccount = function(deleteUsername, username, randomKey, callback) {

    verifyUser(username, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        if(results && results == "done") {
            var deleteAccountSql = " delete from " + tableNames.userLoginTable + " where username= ? ";
            dbPool.runQueryWithParams(deleteAccountSql,[deleteUsername], function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,constants.CALLBACK_SUCCESS);
            })
        } else {
            calback(new Error("unknown error in deleteUserAccount:"+deleteUsername),null);

        }
    });
}*/

/**
 *
 * @param customerId
 * @param isUpComing   true if we need to get upcoming orders, false if we need historical order information
 * @param callback
 */
exports.getOrdersByCustomer = function(customerId, isUpComing, callback) {
    var date = new Date();

    var sql = " select * from customers inner join orders on customers.customer_id = orders.customer_id " +
        "   inner join order_detail od on orders.order_id=order_detail.order_id" +
        "   inner join products on products.product_id = od.product_id" +
        "   inner join parent_product pp on products.parent_product_id=pp.parent_product_id " +
        "   where customers.customer_id= ? ";
    if(isUpComing) {
        sql += " and orders.order_datetime >= ? ";
    } else {
        sql += " and orders.order_datetime < ? " ;
    }

    dbPool.runQueryWithParams(sql,[customerId, date],function(err,results){
        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        callback(null, results);
    })


}