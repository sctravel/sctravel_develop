/**
 * Created by XiTU on 2/12/14.
 */
var nodemailer = require("nodemailer");
//var mail = require("nodemailer").mail;

// create reusable transport method (opens pool of SMTP connections)
// we can move the hardcoded account/password out and read it.
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sctravel2014@gmail.com",
        pass: "TravelInSC"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "SCTravel <sctravel2014@gmail.com>", // sender address
    to: "tuxi1987@gmail.com", // list of receivers
    subject: "Welcome to use SCTravel", // Subject line
    text: "Node JS email test", // plaintext body
    html: "<b>Hello world ! SCTravel</b>" // html body
}

//
exports.sendEmail=function(mailOptions,callback) {
    smtpTransport.sendMail(mailOptions,callback);
}
// send mail with defined transport object
//smtpTransport.sendMail(mailOptions, function(error, response){
//    if(error){
//        console.log(error);
//    }else{
//        console.log("Message sent: " + response.message);
//    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
//});

//mailOptions.subject="Simple Node JS Email";
//mail(mailOptions);