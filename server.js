// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();

const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

var oktaClient = new okta.Client({
    orgUrl: 'https://dev-952719.oktapreview.com/oauth2/default',
    token: '00tuixnNRZPLGGQA8NOnb19kk2IsNYyAaOkkSp26Q0'
  });
  const oidc = new ExpressOIDC({
    issuer: "https://dev-952719.oktapreview.com/oauth2/default",
    client_id: "0oage0l79bHFSik3W0h7",
    client_secret: "PtB8L2qiNiDN_9OeyhmahcpNfLgBCrClDkEuDSAs",
    redirect_uri: 'http://localhost:3000/users/callback',
    scope: "openid profile",
    routes: {
      login: {
        path: "/users/login"
      },
      callback: {
        path: "/users/callback",
        defaultRedirect: "/dashboard"
      }
    }
  });




var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var createError = require('http-errors');
var path = require('path');

var bodyParser = require('body-parser');


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(session({
    secret: 'dsfsalfsfajlkfewiwebnckwaweinsd',
    resave: true,
    saveUninitialized: false
  }));
  app.use(oidc.router);

  app.use((req, res, next) => {
    if (!req.userinfo) {
      return next();
    }
  
    oktaClient.getUser(req.userinfo.sub)
      .then(user => {
        req.user = user;
        res.locals.user = user;
        next();
      }).catch(err => {
        next(err);
      });
  });

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

function loginRequired(req, res, next) {
    if (!req.user) {
      return res.status(401).render("unauthenticated");
    }
  
    next();
  }

app.set('view engine', 'ejs'); // set up ejs for templating


app.get('/test', (req, res) => {
    res.json({ profile: req.user ? req.user.profile : null });
  });

// // routes ======================================================================
//require('./app/routes.js')(app, express); // load our routes and pass in our app and fully configured passport
//require('./app/routes.js')(app, express);

// require('./app/routes.js')(app, express);
// require('./app/routes.js')(app, express);
var publicRouter = require('./app/routes.js');
app.use('/', publicRouter);

var dashboardRouter = require('./app/dashboard.js');
app.use('/dashboard', loginRequired, dashboardRouter);

var usersRouter = require('./app/users.js');
app.use('/users', usersRouter);

//require('./app/dashboard.js')(app, express); 
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;