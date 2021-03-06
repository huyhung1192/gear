var express = require('express');
const session = require('express-session');
var flash = require('req-flash');
var moment = require('moment');
var fs = require('fs');
var app = express();
const lusca = require('lusca');
var multer = require('multer');
const passport = require('passport');
const passportConfig = require('./config/passport');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
	secret : "secret",
	saveUninitialized: true,
	resave: true,
	cookie : {
        maxAge: 3600000 // see below
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// app.use((req, res, next) => {
//   if (req.path === '/user/login' || req.path === '/user/create') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
// app.use(lusca.xframe('SAMEORIGIN'));// lusca registered AFTER cookieParser
// app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   res.locals.url = req.originalUrl;
//   res.locals.baseURL = process.env.BASE_URL;
//   res.locals.baseHOST = process.env.BASE_HOST;
//   next();
// });

// var csrf = require('csurf');

// var csrfProtection = csrf();
// app.use(csrfProtection);

// Sets up a session store with Mongodb

moment().format();


/*FRONTEND*/
var index = require('./routes/frontend/index');
var frontend_users = require('./routes/frontend/user');
// var frontend_trade = require('./routes/frontend/trade');
// var frontend_case = require('./routes/frontend/case');
// var frontend_match = require('./routes/frontend/match');
// var frontend_coupon = require('./routes/frontend/coupon');
// var frontend_events = require('./routes/frontend/events');
// var frontend_myplay = require('./routes/frontend/myplay');
// var frontend_sysmessage = require('./routes/frontend/sysmessage')

/*BACKEND*/
var admin = require('./routes/backend/admin');
var backend_users = require('./routes/backend/user');
var backend_products = require('./routes/backend/product');


app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

/*FRONTEND Appuse*/
app.use('/', index);
app.use('/user', frontend_users);

/*BACKEND Appuse*/

app.use('/admin', admin);
app.use('/admin/user',backend_users);
app.use('/admin/product',backend_products);




app.listen(4000);
console.log('listening port 4000');


module.exports = app;
