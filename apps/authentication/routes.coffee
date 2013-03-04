

routes = (app) ->

  app.get '/login', (req, res) ->
    res.render "#{__dirname}/views/login",
      title: "Login",
      stylesheeet: "login"

module.exports = routes
    