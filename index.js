var http = require('http');
var express = require('express');
// var app = express.createServer();
// var app = require('express').createServer();
// var uuid = require('node-uuid');


var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// server.listen(80);

// socket.io
// var app = require('express').createServer();
// var io = require('socket.io')(app);
// app.listen(80);


//var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var cors         = require('cors');
//var session      = require('express-session');
//var passport     = require('passport');
// var mongoose     = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
// var mongocli = require('./models/mongocli');
//var mysql        = require('mysql');
//var jwt          = require('jsonwebtoken');
//var expressSession = require('express-session');
// gestione delle sicurezza
var frameguard = require('frameguard');
var helmet = require('helmet');

var ENV = require('./configENV.js'); // load configuration data
var ENV_ELEZIONI = require('./configELEZIONI.js'); // load configuration data
/*
app.use(helmet.contentSecurityPolicy({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'd-efault.com','maps.googleapis.com'],
    scriptSrc: ["'self'", 
                //"'unsafe-inline'",
                'maps.googleapis.com',
                ],
    styleSrc: ["'self'",
                //"'unsafe-inline'",
                'fonts.googleapis.com',
                'maps.googleapis.com',
                'maxcdn.bootstrapcdn.com',
                'code.ionicframework.com'],
    fontSrc: ["'self'",
            'fonts.gstatic.com',
            'maxcdn.bootstrapcdn.com',
            'code.ionicframework.com'
            ],
    imgSrc: ["'self'", 'img.com', 'data:'],
    childSsrc: ['self'],
    sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-modals'],
    reportUri: '/report-violation',
    objectSrc: [] // An empty array allows nothing through
  },

  // Set to true if you only want browsers to report errors, not block them
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
}));
*/
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());


// var ENV   = require('./config.js'); // load configuration data

/*
mongoose.connect(ENV.mongodb.MONGODB_URL); // connect to our database

var dbMysql = require('./models/mysqlModule.js');
dbMysql.connect('info', function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    console.log('MySQL connected!');
  }
});

var dbMysqlPhone = require('./models/mysqlPhone.js');
dbMysqlPhone.connect('info', function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    console.log('MySQL Phone connected!');
  }
});


var log = require('./models/loggerModule.js');

//var logger2Mail = log4js.getLogger('mailer');
log.log2file('Starting server');
log.log2console('Starting server');

*/


//logger2Mail.debug('Starting server');

/*
app.use(expressSession({
              secret: 'mySecretKey',
              resave: false,
              saveUninitialized: true,
              cookie: { secure: true }
            }));
*/

// set up our express application

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({
  type: ['json', 'application/csp-report'],
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({ extended: true }));



// MongoDb pool create
// Initialize connection once
/*
log.log2console('MongoDb building pool');
var dbMONGO;
mongocli.connect(ENV.mongodb.MONGODB_URL, function(err, database) {
  if(err) {
    res.status(500).json({ error: 'authenticateMONGO : Connection error' });
    return console.dir(err); 
  }
  log.log2console('MongoDb pool builded!');
  dbMONGO = database;
});
*/

/*
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({ secret: ENV.secret,
                  resave: false,
                  saveUninitialized: true,
                  cookie: { secure: true }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages sto

// Initialize Passport
var initPassport = require('./models/passport/init');
initPassport(passport);
var loginr = require('./routes/loginr')(passport);
app.use('/api/auth', loginr);
*/
/*
var Sloginr = require('./routes/Sloginr')();
app.use('/auth', Sloginr);

var Smer = require('./routes/Smer')();
app.use('/api/s', Smer);

var Mdata = require('./routes/Mdata')();
app.use('/api/m', Mdata);

var SeqData = require('./routes/Seqr')();
app.use('/api/seq', SeqData);

var BravData = require('./routes/Bravr')();
app.use('/api/brav', BravData);

var UploadData = require('./routes/Uploadr')();
app.use('/uploadmgr', UploadData);


var Segnalazioni = require('./routes/Segnalazionir')();
app.use('/segnalazioni', Segnalazioni);

var HelpDesk = require('./routes/HelpDeskr')();
app.use('/helpdesk', HelpDesk);

var Phone = require('./routes/Phoner')();
app.use('/phone', Phone);

var Push = require('./routes/Push')();
app.use('/push', Push);

var Ele = require('./routes/Ele')();
app.use('/ele', Ele);
*/

app.set('socketio', io);

var Elezioni = require('./routes/Elezioni')();
app.use('/elezioni', Elezioni);

/*
//default serving html data
app.use(express.static('ionicclient/www/'));
//app.use(express.static('client/'));
app.use('/cli', express.static(__dirname + '/client'));
app.use('/i2',express.static(__dirname + '/ionic2/www'));
app.use('/poc', express.static(__dirname + '/poc'));
app.use('/swagger', express.static(__dirname + '/swagger'));

*/

app.use('/docs', express.static(__dirname + '/docs'));
 
// socket.io

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/socket.html');
});

// socket = require('./routes/socket.js');
// io.on('connection', socket );


/*
app.get(['/test', '/1produzione/:id1/:id2', '/2test/:id1/id2'], function (req, res) {
  console.log(req);
  console.log(req.params);
  res.send('Hello World!');
});
*/

// CSP violation!
app.post('/report-violation', function (req, res) {
  if (req.body) {
    log.log2console('CSP Violation: ', req.body);
  } else {
    log.log2console('CSP Violation: No data received!');
  }
  res.status(204).end();
})


app.set('port', process.env.PORT || 9989);

/*
var models = require("./modelsSequelize");
models.Person.hasMany(models.Tasks);
models.Person.hasMany(models.Blobs);
models.Person.hasMany(models.Nucleos);
*/

server.listen(app.get('port'), function() {
    console.log('Node ELEZIONI-WS start! porta: ' + ENV.server_port);
    console.log('action_url_produzione:',ENV_ELEZIONI.action_url_produzione);
    console.log('action_url_test:',ENV_ELEZIONI.action_url_test);
    console.log('REST_url_produzione:','http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/batch/produzione');
    console.log('REST_url_test:','http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/batch/test');
    console.log('HTTP_GET_test:','http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/test'); 
});

/*
models.sequelize.sync().then(function () {
  log.log2console('Sequelize sync!');
  var server = app.listen(app.get('port'), function() {
    log.log2console('Express server listening on port ' + server.address().port);
  });
});

*/