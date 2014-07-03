/**
 * Created by XiTU on 4/20/14.
 */

var tableNames = require('./../common/tableNames');
var conn = require('./../dbOperation/createDBConnectionPool');
var stringUtil = require('./../utilities/stringUtils');
var dbPool = require('./../dbOperation/createDBConnectionPool');
var constants = require('./../common/constants');
var encryptionUtil = require('./../utilities/encryptionUtil');

function loginCustomerLoginHistory(customerId, callback) {
    var randomKey = stringUtil.generateRandomString(6);
    var returnObject = {};
    returnObject.customerId = customerId;
    returnObject.randomKey = randomKey;
    console.log("customerId-"+customerId);
    var sql = "insert into " + tableNames.customerLoginHistoryTable + " ( customer_Id, random_key ) values (? , ?) ";

    dbPool.runQueryWithParams(sql,[customerId,randomKey],function(err,results) {

        if(err) {
            callback(err, null);
            return;
        }

        if(results && results.affectedRows==1) {
            console.log("customerId-"+customerId+" logged in.");
            callback(null, returnObject);
        } else {
            calback(new Error("unknown error"),null);
        }
    })
}


exports.logoutCustomerLoginHistory = function(customerId, randomKey, callback) {

    var sql = "update " + tableNames.customerLoginHistoryTable + " set logout_datetime = now() " +
        " where customer_Id = ? and random_key = ? and logout_datetime is null ";

    dbPool.runQueryWithParams(sql,[customerId,randomKey],function(err,results) {

        if(err) {
            callback(err, null);
            return;
        }
        console.dir(results);
        if(results&&results.affectedRows==1) {
            console.log("customerId-"+customerId+" logged out.");
            callback(null, constants.CALLBACK_SUCCESS );
        } else {
            callback(new Error("unknown error"),null);
        }
    })
}

exports.getAccountInfoForCustomer = function(customerId, randomKey, callback) {

    verifyUser(customerId, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return
        }

        if(results && results == "done") {
            var getAllAdmins = " select customer_id, username, email, first_name, last_name, phone, address, city,state, country, " +
                " post_code from " + tableNames.customerTable +" where customer_id= ? and is_active=\"Y\"  ";

            dbPool.runQueryWithParams(getAllAdmins, [customerId], function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,results);
            })
        } else {
            calback(new Error("unknown error in getAccountInfoForCustomer"),null);
        }

    })

}

exports.updateAccountInformation = function(updateAccountInfo, customerId, randomKey, callback) {

    verifyUser(customerId, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        if(results && results == "done") {

            var updateAccountInfoSql = " update " + tableNames.customerTable + " set email = ?, " +
                " first_name=?, last_name=?, phone=?, address=?, city=?, state=? ,country=?, post_code=? where customer_id= ? ";
            var params = [updateAccountInfo.email,updateAccountInfo.firstName,updateAccountInfo.lastName,updateAccountInfo.phone,
                updateAccountInfo.address, updateAccountInfo.city,updateAccountInfo.state, updateAccountInfo.country, updateAccountInfo.postCode, customerId];

            dbPool.runQueryWithParams(updateAccountInfoSql,params, function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,"done");
            })
        } else {
            calback(new Error("unknown error in updateAccountInformation with customerId-"+customerId),null);

        }

    });
}
exports.updatePasswordForAccount = function(updateData,customerId, randomKey, callback) {

    verifyUser(customerId, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        if(updateData.password!= updateData.passwordConfirm) {
            callback(new Error("两次输入的密码不匹配."), null);
            return;
        } else if(updateData.password.length<8) {
            callback(new Error("The length of password should not less than 8."), null);
            return;
        }


        if(results && results == "done") {
            var updatePasswordSql = " update " + tableNames.customerTable + " set password = ? where customer_id= ? ";
            dbPool.runQueryWithParams(updatePasswordSql,[encryptionUtil.saltAndHash(updateData.password),customerId], function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,"done");
            })
        } else {
            calback(new Error("unknown error in updatePasswordForUserAccount with customerId-"+customerId),null);

        }
    });
}

exports.manualLogin = function(username, pass, callback) {
    var authSql = " select customer_id, first_name, last_name, username, password from " +tableNames.customerTable+ " where username=? ";

    var returnObj = {};
    returnObj.isAuthenticated = false;

    //TODO hash the password
    conn.runQueryWithParams(authSql,[username], function(err,results) {
        if(err) {
            returnObj.errorMessage="Internal error, please try again";
            callback(err,returnObj);
            return;
        }
        console.dir(results);
        if(results && results.length==1) {
            if(encryptionUtil.validatePassword(pass,results[0].password )) {
                console.dir(results[0]);
                console.log("In ManualLogin customerId-"+results[0].customer_id);

                loginCustomerLoginHistory(results[0].customer_id, function(err, logResult){
                    if(err) {
                        console.err(err);
                        callback(err,returnObj);
                        return;
                    }
                    returnObj.isAuthenticated = true;
                    returnObj.provider = constants.LOGIN_PROVIDER.SYSTEM;
                    returnObj.customerId = results[0].customer_id;
                    returnObj.firstName = results[0].first_name;
                    returnObj.lastName = results[0].last_name;
                    returnObj.randomKey = logResult.randomKey;
                    callback(null, returnObj);
                })

            } else {
                returnObj.errorMessage = " Password is incorrect. ";
                callback(null, returnObj);
            }
        } else {
            returnObj.errorMessage = " This user doesn't exist. ";
            callback(null, returnObj);
        }
    });
}
function verifyUser(customerId, randomKey, callback) {
    var verifySql = " select  random_key from " + tableNames.customerLoginHistoryTable  +
        " where customer_id = ? and login_datetime > now() - INTERVAL "+ constants.SESSION_HOURS + " HOUR ";

    dbPool.runQueryWithParams(verifySql, [customerId], function(err, results){
        if(err) {
            callback(err,null);
            return;
        }
        if(results && results.length>=1) {
            for(var i in results) {
                if(results[i].random_key == randomKey) {
                    console.info("customerId-"+customerId+" verified.");
                    callback(null,constants.CALLBACK_SUCCESS);
                    return;
                }
            }
            callback(new Error("no randomKey matches"),null);

        } else {
            callback(new Error("unknown error"),null);
        }
    })
}
exports.verifyUser = verifyUser;


function addNewCustomerAccount(newData, callback) {

    if(newData.password!= newData.passwordConf) {
        callback(new Error("Password doesn't match with password confirmation."), null);
        return;
    }

    var newAccountSql = " insert into " + tableNames.customerTable + " ( username, password, first_name, last_name, email,provider) " +
        " values (?,?,?,?,?,?) ";
    var params = [newData.username, encryptionUtil.saltAndHash(newData.password), newData.firstName,
        newData.lastName, newData.email,newData.provider]

    dbPool.runQueryWithParams(newAccountSql,params, function(err,results) {
        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }
        callback(null,results);
    })

}
exports.addNewCustomerAccount = addNewCustomerAccount;
/**
 *
 * @param fbUserData the _json member of the fbUserData returned by facebook
 * @param callback
 */
exports.loginOrCreateAccountWithFacebook = function(fbUserData,callback) {

    var userInfo={};
    userInfo.username="facebook:"+fbUserData.id;
    userInfo.password="facebook:"+fbUserData.id;
    userInfo.passwordConf="facebook:"+fbUserData.id;
    userInfo.firstName = fbUserData.first_name;
    userInfo.lastName = fbUserData.last_name;
    userInfo.email=fbUserData.email;
    userInfo.provider=constants.LOGIN_PROVIDER.FACEBOOK;

    var returnObj={};

    var sql = " select customer_id, email from "+ tableNames.customerTable +" where username = ? ";

    dbPool.runQueryWithParams(sql,[userInfo.username],function(err,results){
        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }
        if(results && results.length==1) { //the account is already registered
            loginCustomerLoginHistory(results[0].customer_id, function(err, logResult){
                if(err) {
                    console.err(err);
                    callback(err,returnObj);
                    return;
                }
                returnObj.isAuthenticated = true;
                returnObj.provider = constants.LOGIN_PROVIDER.FACEBOOK;
                returnObj.customerId = results[0].customer_id;
                returnObj.firstName = userInfo.firstName;
                returnObj.lastName = userInfo.lastName;
                returnObj.randomKey = logResult.randomKey;
                callback(null, returnObj);
            })
        } else { //create new account with facebook information
            addNewCustomerAccount(userInfo,function(err,results){
                if(err) {
                    callback(err,null);
                    return;
                }
                console.dir(results);
                var customerId = results.insertId;

                loginCustomerLoginHistory(customerId, function(err, logResult){
                    if(err) {
                        console.error(err);
                        callback(err,returnObj);
                        return;
                    }
                    returnObj.isAuthenticated = true;
                    returnObj.provider = constants.LOGIN_PROVIDER.FACEBOOK;
                    returnObj.customerId = customerId;
                    returnObj.firstName = userInfo.firstName;
                    returnObj.lastName = userInfo.lastName;
                    returnObj.randomKey = logResult.randomKey;
                    callback(null, returnObj);
                })

            })

        }
    })



}

exports.getOrdersByCustomer = function(customerId, randomKey, isUpComing, callback) {

    verifyUser(customerId, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        var date = new Date();

        var sql = " select customers.customer_id, customers.email, customers.first_name, customers.last_name, customers.phone, " +
            "   orders.order_id, orders.order_datetime, orders.confirmation_code, orders.total_order_amount, orders.order_status, orders.paymentType, " +
            "   od.product_id, od.product_name, od.quantity, od.subtotal_amount, od.start_date, od.end_date," +
            "   products.customer_group, products.product_type, products.subTitle, products.description, products.product_class, products.list_price, " +
            "   pp.parent_product_id, pp.parent_product_name, pp.rating, pp.duration, pp.max_price, pp.min_price " +
            "   from customers inner join orders on customers.customer_id = orders.customer_id " +
            "   inner join order_detail od on orders.order_id=od.order_id" +
            "   inner join products on products.product_id = od.product_id" +
            "   inner join parent_product pp on products.parent_product_id=pp.parent_product_id " +
            "   where customers.customer_id= ? ";
        if(isUpComing) {
            sql += " and od.start_date >= ? ";
        } else {
            sql += " and od.start_date < ? " ;
        }

        dbPool.runQueryWithParams(sql,[customerId, date],function(err,results){
           if(err) {
              console.error(err);
              callback(err,null);
              return;
           }
           console.dir(results);
           callback(null, results);
        })

    });


}


