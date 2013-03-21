require('coffee-script');

/**
 * Module dependencies.
 */

var express = require('express'),
  stylus = require('stylus'),
  RedisStore = require('connect-redis')(express),
  flash = require('connect-flash');

require('express-namespace');

var app = module.exports = express();

// Configuration
app.configure(function () {
  app.use(stylus.middleware({
    src: __dirname + "/views",
    // It will add /stylesheets to this path.
    dest: __dirname + "/public"
  }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', 1337);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser("KioxIqpvdyfMXOHjVkUQmGLwEAtB0SZ9cTuNgaWFJYsbzerCDn"));
  app.use(express.session({
    store: new RedisStore
  }));
  app.use(flash());
  app.use(require('connect-assets')());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('test', function () {
  app.set('port', 3001);
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Global helpers
// require('./apps/helpers')(app);

// Routes
// require('./middleware/upgrade')(app);
// require('./apps/sidewalk/routes')(app);
require('./apps/authentication/routes')(app);
// require('./apps/admin/routes')(app);

server = app.listen(app.settings.port);
console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);

// Express 3.0 returns the server after the call to `listen`.
// require('./apps/socket-io')(app, server);