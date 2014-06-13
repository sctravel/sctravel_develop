/**
 * Created by XiTU on 4/20/14.
 */

var crypto 		= require('crypto');
var tableNames = require('./../common/tableNames');
var conn = require('./../dbOperation/createDBConnectionPool');
var stringUtil = require('./../utilities/stringUtils');
var dbPool = require('./../dbOperation/createDBConnectionPool');
var constants = require('./../common/constants');

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
            calback(new Error("unknown error"),null);
        }
    })
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
            if(validatePassword(pass,results[0].password )) {
                console.dir(results[0]);
                console.log("In ManualLogin customerId-"+results[0].customer_id);

                loginCustomerLoginHistory(results[0].customer_id, function(err, logResult){
                    if(err) {
                        console.err(err);
                        callback(err,returnObj);
                        return;
                    }
                    returnObj.isAuthenticated = true;
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

exports.addNewCustomerAccount = function(newData, callback) {

    if(newData.password!= newData.passwordConf) {
        callback(new Error("Password doesn't match with password confirmation."), null);
        return;
    }

    var newAccountSql = " insert into " + tableNames.customerTable + " ( username, password, first_name, last_name, email) " +
        " values (?,?,?,?,?) ";
    var params = [newData.username, saltAndHash(newData.password), newData.firstName,
        newData.lastName, newData.email]

    dbPool.runQueryWithParams(newAccountSql,params, function(err,results) {
        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }
        callback(null,constants.CALLBACK_SUCCESS);
    })

}


/* private encryption & validation methods */

var generateSalt = function()
{
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
    var salt = generateSalt();
    return (salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass)
{
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    return hashedPass === validHash;
}