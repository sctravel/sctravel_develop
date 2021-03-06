/**
 *
 * This is a file contains many common used functionality related to String.
 * Created by XiTU on 3/18/14.
 */

exports.getDelimitedStringFromArray = function(array, delimiter) {

    if(array ==null || array.length==0) return null;

    var string = "";
    for(var i in array) {
        string = string+array[i]+delimiter;
    }
    //delete the last char (delimiter)
    string = string.slice(0,-1);

    return string;

}

exports.getDelimitedRepeatString = function(string, delimiter, num) {

    if(num<=0) {
        console.log("Number of repeated times: "+num+" is less than 1");
        return null;
    }
    var value = "";

    for(var i=0; i<num; ++i) {
        value= value+string+delimiter;
    }

    value = value.slice(0,-1);

    console.log("String: "+string+"; delimiter: "+delimiter+"; num: "+num +"; value: " + value);

    return value;

}

exports.toDateTimeString = function(date) {

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return date.getFullYear()+month+day+hour+min+sec;
}

var letters = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z'];

//need to check duplicate confirmation_code
/**
* Using Closure!
* @len the length of the random string
**/
exports.generateRandomString=function(length) {
    var letters = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N',
        'O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    function f(len) {
        var confirmationCode="";

        for(var i=0;i<len;++i) {
            var randomNumber=Math.floor(Math.random()*36); //random number between 0 and 35
            confirmationCode=confirmationCode+letters[randomNumber];
        }
        console.log(confirmationCode);
        //callback(confirmationCode);
        return confirmationCode;
    };

    return f(length);
}

/**
 * Use time+customerId+randomNumber to be orderID
 * @param customerId
 * @returns {string}
 */
exports.generateOrderId = function(customerId) {

    var dateTime = new Date();
    var dateString = dateTime.getTime().toString().slice(1,10);

    return dateString+customerId+letters[Math.floor(Math.random()*10)];
}