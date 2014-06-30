
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var dateFormat = require('dateformat');


var constants = require('./lib/common/constants');
var userLogin = require('./lib/login/userLogin');
var clientQueryDB = require('./lib/dbOperation/clientQueryDB');
var payment = require('./lib/utilities/stripePayment');
//var confirmPicGenerator = require('./lib/utilities/confirmPicGenerator');
var passport = require('passport');
var fpass = require('passport-facebook').Strategy;
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


//Home page
app.get('/', function (req,res){
    if(req.user) {
        console.log(req.user);
        res.render('index',{provider:req.user.provider,customerId:req.user.customerId, randomKey:req.user.randomKey,firstName: req.user.firstName, lastName: req.user.lastName});
    } else {
        res.render('index');
    }
});



app.get('/package-search-results', function (req,res){
    var keywords;
    req.session.lastPage = "/package-search-results";

    if(req.query.keywords) {
        keywords = req.query.keywords
    } else if(req.session.searchPackageKeywords) {
        keywords= req.session.searchPackageKeywords;
    } else {
        keywords="";
    }

    if(req.user) {
        res.render('searchPages/packageResults.ejs',{keywords: keywords+"",provider:req.user.provider,customerId:req.user.customerId, randomKey:req.user.randomKey,firstName: req.user.firstName, lastName: req.user.lastName});
    } else {
        res.render('searchPages/packageResults.ejs',{keywords: keywords+""});

    }

});


app.get('/checkout',function (req,res){

    console.dir(req);

    req.session.lastPage = "/checkout";

    res.render('checkoutPages/checkoutResults.ejs',{parentId : req.query.parentId } );


});



app.get('/checkout/:parentId',function (req,res){

    req.session.lastPage = "/checkout";
    res.render('checkoutPages/checkoutResults.ejs',{parentId : req.params.parentId } );
});


app.get('/payment', isLoggedIn,function (req,res){
    res.render('payment/payment.ejs', {provider:req.user.provider,customerId:req.user.customerId, randomKey:req.user.randomKey,firstName: req.user.firstName, lastName: req.user.lastName});
});

app.get('/package-search', function (req,res){
    res.render('searchPages/vacationPackagesSearchPage');
});
//app.all('/users', isLoggedIn);
app.get('/logout', isLoggedIn, function (req, res) {
    console.log(req.user.customerId + " logging out.");
    userLogin.logoutCustomerLoginHistory(req.user.customerId,req.user.randomKey, function(err, results){
        if(results==constants.CALLBACK_SUCCESS) {
        } else {
            console.error("Logout error, please retry");
            return;
        }

    })
    req.flash('success','You have successfully logged out!');
    req.logout();
    res.redirect("/");
});


///////////////////////////////////////////////////////////////////////
// Customer Login and Account Management
///////////////////////////////////////////////////////////////////////
app.get('/login', function (req,res){
    res.render('login/customerLogin',{error: req.flash('error'), success: req.flash('success'), message:req.flash('message') });
});
app.get('/signup', function (req,res){
    res.render('login/createAccount');
});

app.get('/account/myorders', isLoggedIn, function (req,res){
    var user = req.user;
    req.session.lastPage = "/account/myorders";
    res.render('login/myOrdersPage',{provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});
});
app.get('/account/myaccount', isLoggedIn, function (req,res){
    var user = req.user;
    req.session.lastPage = "/account/myaccount";
    res.render('login/myAccountPage',{provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});
});
app.get('/account/myaccount/updatePassword', isLoggedIn, function (req,res){
    var user = req.user;
    req.session.lastPage = "/account/myaccount/updatePassword";
    res.render('login/myAccountPageUpdatePassword',{provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});
});
app.get('/account/myorders/history', isLoggedIn, function (req,res){
    var user = req.user;
    req.session.lastPage = "/account/myorders/history";
    res.render('login/myHistoricalOrdersPage',{provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});
});


///////////////////////////////////////////////////////////////////////
// Passport - Login methods setup
///////////////////////////////////////////////////////////////////////
passport.use('local', new LocalStrategy(
    function (username, password, done) {

        userLogin.manualLogin(username,password, function(error,results){
            console.dir(results);
            if(error) {
                return done(null, false, { message: 'Internal Error.' });
            }
            if(results.isAuthenticated == true ) {
                console.dir(results);
                return done(null, {provider:results.provider,customerId : results.customerId, randomKey: results.randomKey,
                                       firstName: results.firstName, lastName: results.lastName} );
            } else {
                return done(null, false, { message: results.errorMessage });
            }
        });
    }
));
passport.use(new fpass({
        clientID:'323966477728028',
        clientSecret:'660a1a721669c9daa0244faa45113b21',
        callbackURL:'/auth/facebook/callback'
    },
    function(accessToken, refreshToken, fbUserData, done){
        console.dir(fbUserData);
        console.dir(accessToken);
        console.dir(refreshToken);
        userLogin.loginOrCreateAccountWithFacebook(fbUserData._json,function(err,results){
            console.dir(results);
            if(err) {
                return done(null, false, { message: 'Internal Error.' });
            }
            if(results.isAuthenticated == true ) {
                console.dir(results);
                return done(null,{provider:results.provider,customerId :results.customerId, randomKey: results.randomKey,
                    firstName: results.firstName, lastName: results.lastName});
            } else {
                return done(null, false, { message: results.errorMessage });
            }
        })

    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, {provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName});//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, {provider:user.provider,customerId:user.customerId, randomKey:user.randomKey,firstName: user.firstName, lastName: user.lastName} );//可以通过数据库方式操作
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.dir(req.user);
        return next();
    }

    res.redirect("/login");
}


app.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureFlash: true }),
    function(req,res){
        console.dir(req.session);
        if(req.session.lastPage) {
            res.redirect(req.session.lastPage);
        } else {
            res.redirect("/");
        }

    }
);
// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
    passport.authenticate('facebook',{ scope: ['user_about_me', 'email','public_profile'] }),
    function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login' })
    ,
    function(req,res){
        console.dir(req.session);
        if(req.session.lastPage) {
            res.redirect(req.session.lastPage);
        } else {
            res.redirect("/");
        }

    }
);

///////////////////////////////////////////////////////////////
//REST data services
// need to follow the convention, every REST service's url
// should start with "/services/..."
///////////////////////////////////////////////////////////////

app.post('/services/stripePayment',isLoggedIn,function(req,res){
    console.dir(req.body);
    payment.pay(req.body,function(err,results){
        console.dir(results);
    });
})

//Data Services for account
app.post('/services/customer/accounts/new', function(req,res) {
    var newAccountInfo = req.body.newAccountInfo;
    newAccountInfo.provider=constants.LOGIN_PROVIDER.SYSTEM;
    userLogin.addNewCustomerAccount(newAccountInfo, function(err,results){
        if(err) {
            console.error(err);
            res.send(err);
        } else {
            console.info(results);
            res.send("done");
        }
    });
});

app.post('/account/updatePassword',isLoggedIn, function(req,res){
    var user = req.user ;
    var updateData = req.body.updateData;
    console.log("updating password!")
    console.dir(updateData);
    userLogin.updatePasswordForAccount(updateData,user.customerId,user.randomKey,function(err,data){
        if(err) {
            console.error(err);
            return;
        }

        if(data==constants.CALLBACK_SUCCESS){
            res.send(data);
        }

    })

})

app.get('/services/customer/orders/upcoming', isLoggedIn, function(req,res) {

    userLogin.getOrdersByCustomer(req.user.customerId, req.user.randomKey, true, function(err,results){
        if(err) {
            console.error(err);
            return;
        }

        res.send(results);
    })
})
app.get('/services/customer/orders/historical', isLoggedIn, function(req,res) {

    userLogin.getOrdersByCustomer(req.user.customerId, req.user.randomKey, false, function(err,results){
        if(err) {
            console.error(err);
            return;
        }

        res.send(results);
    })
})

app.get('/services/customer/accounts', isLoggedIn, function(req,res){

    userLogin.getAccountInfoForCustomer(req.user.customerId,req.user.randomKey, function(err,results){
        if(err) {
            console.error(err);
            return;
        }

        res.send(results);
    })
})


app.get('/services/getConfirmPic',function(req,res){
    var conf = confirmPicGenerator.generateConfirmPic();
    req.session.confirmText = conf[0];
    console.log("text is "+conf[0]);
    res.end(conf[1]);
})

app.post('/services/account/updateAccountInfo',isLoggedIn, function(req,res){
    var user = req.user ;
    var updateAccountInfo = req.body.updateAccountInfo;
    console.log("updating account information!")
    console.dir(updateAccountInfo);
    userLogin.updateAccountInformation(updateAccountInfo,user.customerId,user.randomKey,function(err,data){
        if(err) {
            console.error(err);
            return;
        }

        if(data==constants.CALLBACK_SUCCESS){
            res.send(data);
        }

    })

})



app.post('/services/package-search',function(req,res){
    var keywords = req.body.keywords;
    req.session.searchPackageKeywords = keywords;
    clientQueryDB.searchVacationPackagesByKeyWords(keywords,function(err,results){
        if(err) {
            res.send("error");
            return;
        }
        res.send(results);
        //res.render('searchPages/vacationPackagesSearchPage',{keywords: keywords,packageSearchResults:results});
    })
})


app.post('/children-products',function(req,res){

    console.warn("invoking restful feed children-products");
    var product_parentId = req.body.parent_productId;

    console.warn("product_parentId: "+ product_parentId);

    clientQueryDB.searchChildrenProducts(product_parentId,function(err,results){
        if(err) {
            res.send("error");
            return;
        }
        res.send(results);

    })
})





http.createServer(app).listen(app.get('port'), function(){
                              console.log('Express server listening on port ' + app.get('port'));
                              });




