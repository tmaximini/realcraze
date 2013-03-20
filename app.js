
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , http    = require('http')
  , path    = require('path');

var app = module.exports = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secr3t_co0kie'));
  app.use(express.session({
    secret: "lksaökdaölskdökadaskdökaösdlnmnmnsdfsd",
    store: new RedisStore
  }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('test', function(){
  app.set('port', 3001)
});

/**
  * ROUTES
  */

require('./apps/authentication/routes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
