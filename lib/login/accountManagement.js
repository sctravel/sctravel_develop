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

exports.addNewAccount = function(newData, username, randomKey, callback) {

    if(newData.password!= newData.passwordConfirm) {
        callback(new Error("password doesn't match with password confirmation."), null);
        return;
    }

    verifyUser(username, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return
        }

        if(results && results == "done") {
            var newAccountSql = " insert into " + tableNames.userLoginTable + " (username, name, password) values (?,?,?)";

            dbPool.runQueryWithParams(newAccountSql,[newData.username, newData.name,newData.password/*saltAndHash(newData.password)*/], function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,"done");
            })
        } else {
            calback(new Error("unknown error in addNewAccount:"+username),null);
        }

    })


}

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
                callback(null,"done");
            })
        } else {
            calback(new Error("unknown error in deleteUserAccount:"+deleteUsername),null);

        }
    });
}

exports.updatePasswordForAdminAccount = function(updateData,username, randomKey, callback) {

    verifyUser(username, randomKey, function(err,results){

        if(err) {
            console.error(err);
            callback(err,null);
            return;
        }

        if(updateData.password!= updateData.passwordConfirm) {
            callback(new Error("两次输入的密码不匹配."), null);
            return;
        }

        if(results && results == "done") {
            var updatePasswordSql = " update " + tableNames.userLoginTable + " set password = ? where username= ? ";
            dbPool.runQueryWithParams(updatePasswordSql,[updateData.password,updateData.updateUsername], function(err,results) {
                if(err) {
                    console.error(err);
                    callback(err,null);
                    return;
                }
                callback(null,"done");
            })
        } else {
            calback(new Error("unknown error in updatePasswordForUserAccount"+username),null);

        }
    });
}