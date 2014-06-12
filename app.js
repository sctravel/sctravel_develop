
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var dateFormat = require('dateformat');


var constants = require('./lib/common/constants');
var userLogin = require('./lib/login/userLogin');
var confirmPicGenerator = require('./lib/utilities/confirmPicGenerator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var app = express();



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('123456xyz'));
app.use(express.session({cookie: { maxAge : constants.SESSION_HOURS*60*60*1000 }})); // Session expires in SESSION_HOURS hours
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.methodOverride());


/*********************************************************
 *Log4js configuration
 *********************************************************/
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024*1024*100,
            backups:3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}


app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
};




app.get('/services/getConfirmPic',function(req,res){
    var conf = confirmPicGenerator.generateConfirmPic();
    req.session.confirmText = conf[0];
    console.log("text is "+conf[0]);
    res.end(conf[1]);
})

//********************************************************************
// * CustomerLogin methods
//********************************************************************/
passport.use('local', new LocalStrategy(
    function (username, password, done) {

        userLogin.manualLogin(username,password, function(error,results){
            console.dir(results);
            if(error) {
                return done(null, false, { message: 'Internal Error.' });
            }
            if(results.isAuthenticated == true ) {
                console.dir(results);
                return done(null, {customerId : results.customerId, randomKey: results.randomKey,
                                       firstName: results.firstName, lastName: results.lastName} );
            } else {
                return done(null, false, { message: results.errorMessage });
            }
        });
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, {username:user.username, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, {username:user.username, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName} );//可以通过数据库方式操作
});

//Home page
app.get('/', function (req,res){
    res.render('index');
});
app.get('/test', function (req,res){
    res.render('test');
});
app.get('/login', function (req,res){
    res.render('login/customerLogin',{error: req.flash('error'), success: req.flash('success'), message:req.flash('message') });
});

app.get('/signup', function (req,res){
    res.render('login/createAccount');
});
app.get('/results', function (req,res){
    res.render('searchPages/packageResults.ejs');
});

app.get('/checkout', function (req,res){
    res.render('checkoutPages/checkoutResults.ejs');
});

app.get('/hotel-search', function (req,res){
    res.render('searchPages/vacationPackagesSearchPage');
});

//User Login Functionalities

app.post('/services/customer/accounts/new', function(req,res) {
    var newAccountInfo = req.body.newAccountInfo;

    userLogin.addNewCustomerAccount(newAccountInfo, function(err,results){
        if(err) {
            console.error(err);
            res.send(err);
        } else {
            console.info(results);
            res.send(results);
        }
    });

});

//app.all('/users', isLoggedIn);
app.get('/logout', isLoggedIn, function (req, res) {
    console.log(req.user.customerId + " logged out.");
    userLogin.logoutCustomerLoginHistory(req.user.customerId,req.user.randomKey, function(err, results){
        console.info("");//write logout history success
    })
    req.flash('success','登出成功!');
    req.logout();
    res.redirect("/");
});

app.post('/login',
    passport.authenticate('local',
        { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
);


http.createServer(app).listen(app.get('port'), function(){
                              console.log('Express server listening on port ' + app.get('port'));
                              });


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.dir(req.user);
        return next();
    }

    res.redirect("/adminLogin");
}


