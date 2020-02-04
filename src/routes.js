const routes = require('express').Router()
const UserController = require('./app/controller/UserController')


routes.get('/user', UserController.get)

routes.post('/user', UserController.post)





module.exports = routes