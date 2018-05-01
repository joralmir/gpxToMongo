var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  routes = require('./api/routes/route'),
  configuration = require('./configuration/configuration'),
  logger = require('morgan');

  // Custom MIDDLEWARES Import === jwauth && Winston Debugger
  //var config = require("./configuration/configuration");
  // var jwtauth = require("./middlewares/jwtauth");
  var logger = require("./middlewares/logger");

app.use(cors());
logger.debug("Overriding 'Express' logger");
app.use(require('morgan')("combined",{ "stream": logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

app.listen(port);
logger.debug('Server listening on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(configuration.mongoUrl, {useMongoClient: true});
logger.debug('MONGO dB connection established...');
