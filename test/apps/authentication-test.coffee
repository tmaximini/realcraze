<<<<<<< HEAD
require '../_helper'
assert  = require 'assert'
request = require 'request'
app     = require '../../server'

describe "authentication", ->
  describe "GET / login", ->
    
    body = null
    
    before ->
      options =
        uri: "htpp://localhost:1337/login"
      
      request options, (err, response, _body) ->
        body = _body
        done()
        
    
    it "has a user field", ->
      assert.ok /user/.test(body)
  
=======

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
>>>>>>> 62a75ed297fdfb372e8f297aa77d38929c3439d8
