
assert  = require 'assert'
request = require 'request'
app     = require '../../app'

describe "authentication", ->
  describe "GET / login", ->
    body = null
    before (done) ->
      options =
        uri: "http://localhost:3001/login"
      request options, (err, response, _body) ->
        body = _body
        done()
    
    it "has user field", ->
      assert.ok /user/.test(body)
      
    it "has tag input", ->
      assert.hasTag body, '//head/title', 'Demo app - Login'