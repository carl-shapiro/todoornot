// server.js

    // set up ========================
    var config = require('dotenv').config()
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    const connectionString = "mongodb://"+ process.env.MONGO_USER +":"+process.env.MONGO_PASS+"@"+process.env.MONGO_HOST+"/"+process.env.MONGO_COLLECTION;
    mongoose.connect(connectionString);     // connect to mongoDB database on modulus.io
    //mongoose connection error handling
    mongoose.connection.on('error', function (err) {
      console.log("Connection error on init!" , err);
    });
    //reconnect mongoose
    mongoose.connection.on('disconnected', function () {
      self.connectToDatabase();
    });

    // configuring express
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(express.static(__dirname + '/assets'));
    require('./routes')(app);

    // listen (start app with node server.js)
    app.listen(8080);
    console.log("App listening on port 8080");
